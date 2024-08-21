import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import helmet from "helmet";
import fs from "fs/promises";
import { JSONFilePreset } from "lowdb/node";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors('*'));
app.use(bodyParser.json());
app.use(
  helmet({
    permissionsPolicy: {
      directives: {
        "run-ad-auction": [],
        "private-state-token-redemption": [],
        "private-state-token-issuance": [],
        "join-ad-interest-group": [],
        "browsing-topics": [],
      },
    },
  })
);

class APIError extends Error {
  constructor(message, statusCode, info) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.info = info;

    Error.captureStackTrace(this, this.constructor);
  }
}

function asyncWrapper(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

function authenticate(req, res, next) {
  if (req.user) {
    return next();
  } else {
    throw new APIError("Not authenticated!", 401);
  }
}

const emptyDb = {};
let db = null;

// Set user if token is present
app.use(
  asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token != null) {
      const id = await jwt.verify(token, process.env.JWT_SECRET).userId;
      req.user = await db.data.users.find((user) => user.id == id);
    }
    // const session = req.headers['session'];
    // console.log(session);
    return next();
  })
);

app.get(
  "/ping",
  asyncWrapper(async (req, res, next) => {
    return res.json();
  })
);

const sseConnections = {};
app.get('/events', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    sseConnections[req.headers['session']] = res;
  
    // const interval = setInterval(() => {
    //   res.write(`data: ${new Date().toISOString()}\n\n`);
    // }, 1000);
  
    req.on('close', () => {
    //   clearInterval(interval);
      res.end();
      delete sseConnections[req.headers['session']];
    });
  });

app.get(
  "/test/db",
  asyncWrapper(async (req, res, next) => {
    return res.json(db);
  })
);

app.post(
  "/auth/login",
  asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await db.data.users.find((user) => user.email == email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new APIError("Authentication failed", 401);
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return
    return res.json({ user, token, data: db.data });
  })
);

app.get(
  "/data",
  asyncWrapper(async (req, res) => {
    try {
      res.json({ data: db.data, user: req.user });
    } catch (error) {
      res.status(500);
    }
  })
);

app.get(
  "/list",
  authenticate,
  asyncWrapper(async (req, res) => {
    try {
      res.json(db.data.list);
    } catch (error) {
      res.status(500).json({ message: "Error fetching list" });
    }
  })
);

app.post(
  "/list/item",
  asyncWrapper(async (req, res, next) => {
    const item = {
      id: uuidv4(),
      status: "open",
      ...req.body,
    };

    db.data.list.items.unshift(item);
    await db.write();

    return res.json({ list: db.data.list, id: item.id });
  })
);

app.put(
  "/list/item/:id",
  asyncWrapper(async (req, res, next) => {
    Object.assign(
      db.data.list.items.find((item) => item.id == req.params.id),
      req.body
    );
    await db.write();

    return res.json(db.data.list);
  })
);

app.post(
  "/list/item/:id/complete",
  asyncWrapper(async (req, res, next) => {
    const item = db.data.list.items.find((item) => item.id == req.params.id);
    item.status = "completed";
    await db.write();

    return res.json(db.data.list);
  })
);

app.post(
  "/list/item/:id/open",
  asyncWrapper(async (req, res, next) => {
    const item = db.data.list.items.find((item) => item.id == req.params.id);
    item.status = "open";
    await db.write();

    return res.json(db.data.list);
  })
);

app.post(
  "/list/clear",
  asyncWrapper(async (req, res, next) => {
    db.data.list.items = [];
    await db.write();

    return res.json(db.data.list);
  })
);

app.delete(
  "/list/delete-completed-items",
  asyncWrapper(async (req, res, next) => {
    db.data.list.items = db.data.list.items.filter(
      (item) => item.status != "completed"
    );
    await db.write();

    return res.json(db.data.list);
  })
);

app.post(
  "/list/show-completed-items/:show",
  asyncWrapper(async (req, res, next) => {
    db.data.list.showCompletedItems = req.params.show == "true";
    await db.write();

    return res.json({ success: true });
  })
);

app.get(
  "/menu",
  authenticate,
  asyncWrapper(async (req, res) => {
    try {
      res.json(db.data.menu);
    } catch (error) {
      res.status(500).json({ message: "Error fetching menu" });
    }
  })
);

app.post(
  "/menu",
  asyncWrapper(async (req, res, next) => {
    const { ingredients } = req.body;

    // Build ingredient list
    const listIngredients = ingredients.reduce(
      (acc, cur) => addIngredientToList(acc, cur),
      []
    );
    const menu = db.data.menu;
    const vendors = Object.fromEntries(
      menu.ingredients.map((ingredient) => [ingredient.name, ingredient.vendor])
    );

    // Add ingredients to shopping list
    for (const ingredient of listIngredients) {
      const item = {
        id: uuidv4(),
        name: ingredient.name,
        category: vendors[ingredient.name] || "",
        notes: amountsToString(ingredient.amounts),
        status: "open",
        ...(ingredient.due && { due: ingredient.due }),
      };
      db.data.list.items.push(item);
    }

    // Add missing ingredients to ingredient list (with empty vendor)
    db.data.menu.ingredients.push(
      ...listIngredients
        .filter((ingredient) => !vendors[ingredient.name])
        .map((ingredient) => ({ name: ingredient.name, vendor: "" }))
    );
    await db.write();

    return res.json({ list: db.data.list, menu: db.data.menu });
  })
);

app.put(
  "/menu/dish/:id",
  asyncWrapper(async (req, res, next) => {
    Object.assign(
      db.data.menu.dishes.find((dish) => dish.id == req.params.id),
      req.body
    );
    await db.write();

    return res.json(req.body);
  })
);

app.put(
  "/menu/vendors",
  asyncWrapper(async (req, res, next) => {
    db.data.menu.ingredients = req.body;
    await db.write();

    return res.json(db.data.menu.ingredients);
  })
);

const addAmountToList = (list, amount) => {
  if (amount.unit == null) {
    return list.length > 0 ? list : [amount];
  } else {
    if (list.length == 1 && list[0].unit == null) {
      return [amount];
    } else {
      if (list.find((item) => item.unit == amount.unit) == undefined) {
        return list.concat([amount]);
      } else {
        const newList = _.cloneDeep(list);
        sameUnit = newList.find((item) => item.unit == amount.unit);
        sameUnit.value += amount.value;

        return newList;
      }
    }
  }
};

const addIngredientToList = (list, ingredient) => {
  const newList = _.cloneDeep(list);

  if (
    newList.find(
      (item) => item.name == ingredient.name && item.due == ingredient.due
    ) == undefined
  ) {
    return newList.concat([
      {
        name: ingredient.name,
        amounts: [ingredient.amount],
        due: ingredient.due,
      },
    ]);
  } else {
    const sameIngredient = newList.find(
      (item) => item.name == ingredient.name && item.due == ingredient.due
    );
    sameIngredient.amounts = addAmountToList(
      sameIngredient.amounts,
      ingredient.amount
    );

    return newList;
  }
};

const amountsToString = (amounts) => {
  if (amounts.length == 1 && amounts[0].unit == null) {
    return "";
  } else {
    return amounts
      .map((amount) => `${amount.value} ${amount.unit}`)
      .join(" + ");
  }
};

// async function saveDb() {
//     console.log('Saving in-memory database to file...');

//     try {
//         const data = JSON.stringify(db, null, 2);
//         await fs.writeFile('./db.json', data, 'utf8');
//         console.log('Data successfully saved to file');
//       } catch (error) {
//         console.error('Error writing file:', error);
//       }

//     process.exit(0);
// }

// process.on('SIGTERM', saveDb);
// process.on('SIGINT', saveDb);

// Start the server
app.listen(port, async () => {
  try {
    // const data = await fs.readFile('./db.json', 'utf8');
    db = await JSONFilePreset("./db.json", emptyDb);
    // db = JSON.parse(data);
    console.log("Database loaded successfully");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        "No existing database file found. Starting with an empty database."
      );
    } else {
      console.error("Error reading database file:", error);
    }
    db = { data: {} }; // Ensure db is an empty object if file read fails
  }

  console.log(`Server running on http://localhost:${port}`);
});
