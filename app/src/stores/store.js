// stores/store.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { api, session } from "boot/axios";
import { notify } from "boot/notify";
import {  EventSourcePolyfill } from 'event-source-polyfill';

export const useStore = defineStore("store", {
  state: () => ({
    global: { status: "loading", sse: null },
    persistent: {
      api: "http://localhost:3001",
      // api: "https://menu.server.michoest.com",
      token: null,
    },
    user: null,
    data: {},
    list: { items: [], showCompletedItems: false },
    menu: { dishes: [], ingredients: [] },
  }),
  getters: {},
  actions: {
    async fetch() {
      try {
        if (this.persistent.token) {
          this.global.status = "loading";

          const response = await api.get("/data");
          ({ data: this.data, user: this.user } = response.data);
        }

        if (!this.global.sse) {
          this.connectToSSE();
        }

        this.global.status = "ok";
      } catch (err) {
        const message = err.response?.data?.notification?.message;

        if (message) {
          switch (message) {
            case "jwt malformed":
            case "Not authenticated!":
            case "jwt expired":
              notify("Redirecting to login...");
              this.logout();
              this.router.push("/login");
              this.global.status = "ok";
              break;
          }
        } else {
          console.error(err);
          this.global.status = "error";
          notify(`Error: ${err}`, { type: "negative" });
        }
      }
    },
    async login({ email, password }) {
      try {
        const response = await api.post(`/auth/login`, { email, password });
        const { user, data, token } = response.data;

        if (token) {
          this.user = user;
          this.data = data;
          this.persistent.token = token;

          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // this.initSSE();

          notify(`Logged in as ${user.name.first} ${user.name.last}!`);
          this.connectToSSE();

          // Redirect to default tab
          this.router.push({ path: "/list" });
        }
      } catch (err) {
        const message = err.response?.data?.notification?.message;

        if (message) {
          switch (message) {
          }
        } else {
          console.error(err);
          notify(`Error: ${err}`, { type: "negative" });
        }
      }
    },
    async logout() {
      this.global.status = 'loading';
      this.user = null;
      this.persistent.token = null;
      this.closeSSE();

      api.defaults.headers.common["Authorization"] = null;

      notify("Logged out!");
      this.router.push("/login");
    },
    async fetchList() {
      try {
        const response = await api.get(`/list`);
        this.list = response.data;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async fetchMenu() {
      try {
        const response = await api.get(`/menu`);
        this.menu = response.data;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async addItem(item) {
      try {
        const response = await api.post(`/list/item/`, item);
        this.list = response.data.list;

        return response.data.id;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });

        return null;
      }
    },
    async saveItem(item) {
      try {
        const response = await api.put(`/list/item/${item.id}`, item);
        this.list = response.data;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async completeItem(itemId) {
      try {
        const response = await api.post(`/list/item/${itemId}/complete`);
        this.list = response.data;

        return true;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async openItem(itemId) {
      try {
        const response = await api.post(`/list/item/${itemId}/open`);
        this.list = response.data;

        return true;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async addToList(ingredients) {
      try {
        const response = await api.post(`/menu/`, {
          ingredients,
        });
        ({ list: this.list, menu: this.menu } = response.data);

        return true;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async clearList() {
      try {
        const response = await api.post(`/list/clear`);
        this.list = response.data;

        return true;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async deleteCompletedItems() {
      try {
        const response = await api.delete(`/list/delete-completed-items`);
        this.list = response.data;

        return true;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async showCompletedItems(show) {
      try {
        const response = await api.post(`/list/show-completed-items/${show}`);

        this.list.showCompletedItems = show;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async editDish(dish) {
      try {
        const response = await api.put(`/menu/dish/${dish.id}`, dish);

        // Replace the dish, but keep the amount
        const index = this.menu.dishes.find((dish_) => dish.id == dish.id);
        this.menu.dishes.splice(index, 1, response.data);

        return true;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async saveVendors(ingredients) {
      try {
        const response = await api.put(`/menu/vendors`, ingredients);
        this.menu.ingredients = response.data;

        return true;
      } catch (err) {
        notify(`Error: ${err}`, { type: "negative" });
      }
    },
    async checkAPI(url) {
      try {
        await api.get(`${url}/ping`, { baseURL: "" });

        return true;
      } catch (err) {
        return false;
      }
    },
    setAPI(url) {
      this.persistent.api = url;
      api.defaults.baseURL = url;
    },
    async connectToSSE() {
      if (!this.global.sse) {
        const eventSource = new EventSourcePolyfill('http://localhost:3001/events', { headers: { 'session': session }});

        eventSource.addEventListener('message', (event) => {
          // console.log(event.data);
        });

        eventSource.addEventListener('error', (event) => {
          // if (event.readyState === EventSource.CLOSED) {
          //   error.value = 'Connection closed';
          // } else {
          //   error.value = 'An error occurred while connecting to the server';
          // }
          eventSource.close();
          this.global.sse = null;
        });

        this.global.sse = eventSource;
      }
    },
    async closeSSE() {
      if (this.global.sse) {
        this.global.sse.close();
        this.global.sse = null;
      }
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ["persistent"],
    afterRestore: (ctx) => {
      const $api = ctx.app.config.globalProperties.$api;
      $api.defaults.baseURL = ctx.store.persistent.api;

      if (ctx.store.persistent.token != null) {
        $api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${ctx.store.persistent.token}`;
      }
      ctx.store.data = {};
      ctx.store.global.status = "loading";
    },
  },
});
