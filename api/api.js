const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const helmet = require('helmet');
const fs = require('fs').promises;

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet({
    permissionsPolicy: {
        directives: {
        "run-ad-auction": [],
        "private-state-token-redemption": [],
        "private-state-token-issuance": [],
        "join-ad-interest-group": [],
        "browsing-topics": []
        },
    },
}));

class APIError extends Error {
    constructor(message, statusCode, info) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
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

let db = {};

app.get('/ping', asyncWrapper(async(req, res, next) => {
    return res.json();
}));

app.get('/list', asyncWrapper(async (req, res) => {
  try {
    res.json(db.list);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching list' });
  }
}));

app.post('/list/item', asyncWrapper(async (req, res, next) => {
    const item = {
        id: uuidv4(),
        status: 'open',
        ...req.body 
    };

    db.list.items.unshift(item);

    return res.json({ list: db.list, id: item.id });
}));

app.put('/list/item/:id', asyncWrapper(async (req, res, next) => {
    Object.assign(db.list.items.find(item => item.id == req.params.id), req.body);

    return res.json(db.list);
}));

app.post('/list/item/:id/complete', asyncWrapper(async (req, res, next) => {
    const item = db.list.items.find(item => item.id == req.params.id);
    item.status = 'completed';
    
    return res.json(db.list);
}));

app.post('/list/item/:id/open', asyncWrapper(async (req, res, next) => {
    const item = db.list.items.find(item => item.id == req.params.id);
    item.status = 'open';
    
    return res.json(db.list);
}));

app.post('/list/clear', asyncWrapper(async (req, res, next) => {
    db.list.items = [];
    
    return res.json(db.list);
}));

app.delete('/list/delete-completed-items', asyncWrapper(async (req, res, next) => {
    db.list.items = db.list.items.filter(item => item.status != 'completed');
    
    return res.json(db.list);
}));

app.post('/list/show-completed-items/:show', asyncWrapper(async (req, res, next) => {
    db.list.showCompletedItems = req.params.show == 'true';
    
    return res.json({ success: true });
}));

app.get('/menu', asyncWrapper(async (req, res) => {
    try {
      res.json(db.menu);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching menu' });
    }
}));

app.post('/menu', asyncWrapper(async (req, res, next) => {
    const { ingredients } = req.body;

    // Build ingredient list
    const listIngredients = ingredients.reduce((acc, cur) => addIngredientToList(acc, cur), []);
    const menu = db.menu;
    const vendors = Object.fromEntries(menu.ingredients.map(ingredient => ([ingredient.name, ingredient.vendor])));

    // Add ingredients to shopping list
    for (const ingredient of listIngredients) {
        const item = { 
            id: uuidv4(),
            name: ingredient.name, 
            category: vendors[ingredient.name] || '', 
            notes: amountsToString(ingredient.amounts),
            status: 'open',
            ...ingredient.due && { due: ingredient.due }
        };
        db.list.items.push(item);
    }

    // Add missing ingredients to ingredient list (with empty vendor)
    db.menu.ingredients.push(...listIngredients.filter(ingredient => !vendors[ingredient.name]).map(ingredient => ({ name: ingredient.name, vendor: '' })));

    return res.json({ list: db.list, menu: db.menu });
}));

app.put('/menu/dish/:id', asyncWrapper(async (req, res, next) => {
    Object.assign(db.menu.dishes.find(dish => dish.id == req.params.id), req.body);

    return res.json(req.body);
}));

app.put('/menu/vendors', asyncWrapper(async (req, res, next) => {
    db.menu.ingredients = req.body;

    return res.json(db.menu.ingredients);
}));


const addAmountToList = (list, amount) => {
    if (amount.unit == null) {
        return list.length > 0 ? list : [amount];
    }
    else {
        if (list.length == 1 && list[0].unit == null) {
            return [amount];
        }
        else {
            if (list.find(item => item.unit == amount.unit) == undefined) {
                return list.concat([amount]);
            }
            else {
                const newList = _.cloneDeep(list);
                sameUnit = newList.find(item => item.unit == amount.unit);
                sameUnit.value += amount.value;

                return newList;
            }
        }
    }
}

const addIngredientToList = (list, ingredient) => {
    const newList = _.cloneDeep(list);

    if (newList.find(item => item.name == ingredient.name && item.due == ingredient.due) == undefined) {
        return newList.concat([{ name: ingredient.name, amounts: [ingredient.amount], due: ingredient.due }]);
    }
    else {
        const sameIngredient = newList.find(item => item.name == ingredient.name && item.due == ingredient.due);
        sameIngredient.amounts = addAmountToList(sameIngredient.amounts, ingredient.amount);

        return newList;
    }
}

const amountsToString = (amounts) => {
    if (amounts.length == 1 && amounts[0].unit == null) {
        return '';
    }
    else {
        return amounts.map(amount => `${amount.value} ${amount.unit}`).join(' + ');
    }
}
  
async function saveDb() {
    console.log('Saving in-memory database to file...');

    try {
        const data = JSON.stringify(db, null, 2);
        await fs.writeFile('./db.json', data, 'utf8');
        console.log('Data successfully saved to file');
      } catch (error) {
        console.error('Error writing file:', error);
      }

    process.exit(0);
}

process.on('SIGTERM', saveDb);
process.on('SIGINT', saveDb);

// Start the server
app.listen(port, async () => {
    try {
        const data = await fs.readFile('./db.json', 'utf8');
        db = JSON.parse(data);
        console.log('Database loaded successfully');
    } catch (error) {
        if (error.code === 'ENOENT') {
          console.log('No existing database file found. Starting with an empty database.');
        } else {
          console.error('Error reading database file:', error);
        }
        db = {}; // Ensure db is an empty object if file read fails
    }

    console.log(`Server running on http://localhost:${port}`);
});