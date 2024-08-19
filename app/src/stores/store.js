// stores/store.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';
import { notify } from 'boot/notify';

export const useStore = defineStore('store', {
  state: () => ({
    user: 'roßes',
    list: { items: [], showCompletedItems: false },
    menu: { dishes: [], ingredients: [] },
    // api: 'https://menu.server.michoest.com',
    api: 'http://localhost:3001'
  }),
  getters: {

  },
  actions: {
    async fetchList() {
      try {
        const response = await axios.get(`${this.api}/list`);
          this.list = response.data;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async fetchMenu() {
      try {
        const response = await axios.get(`${this.api}/menu`);
          this.menu = response.data;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async addItem(item) {
      try {
          const response = await axios.post(`${this.api}/list/item/`, item);
          this.list = response.data.list;

          return response.data.id;

      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });

          return null;
      };
    },
    async saveItem(item) {
      try {
          const response = await axios.put(`${this.api}/list/item/${item.id}`, item);
          this.list = response.data;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      };
    },
    async completeItem(itemId) {
      try {
          const response = await axios.post(`${this.api}/list/item/${itemId}/complete`);
          this.list = response.data;

          return true;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async openItem(itemId) {
      try {
        const response = await axios.post(`${this.api}/list/item/${itemId}/open`);
        this.list = response.data;

        return true;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async addToList(ingredients) {
      try {
        const response = await axios.post(`${this.api}/menu/`, { ingredients });
        ({ list: this.list, menu: this.menu } = response.data);

        return true;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async clearList() {
      try {
          const response = await axios.post(`${this.api}/list/clear`);
          this.list = response.data;

          return true;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async deleteCompletedItems() {
      try {
          const response = await axios.delete(`${this.api}/list/delete-completed-items`);
          this.list = response.data;

          return true;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async showCompletedItems(show) {
      try {
          const response = await axios.post(`${this.api}/list/show-completed-items/${show}`);

          this.list.showCompletedItems = show;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async editDish(dish) {
      try {
        const response = await axios.put(`${this.api}/menu/dish/${dish.id}`, dish);

        // Replace the dish, but keep the amount
        const index = this.menu.dishes.find(dish_ => dish.id == dish.id);
        this.menu.dishes.splice(index, 1, response.data);

        return true;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async saveVendors(ingredients) {
      try {
        const response = await axios.put(`${this.api}/menu/vendors`, ingredients);
        this.menu.ingredients = response.data;

        return true;
      }
      catch (err) {
        notify(`Error: ${err}`, { type: 'negative' });
      }
    },
    async checkAPI() {
      try {
        await axios.get(`${this.api}/ping`);

        return true;
      }
      catch (err) {
        return false;
      }
    }
  }
});
