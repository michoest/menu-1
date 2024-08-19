<template>
  <q-dialog v-model="show" position="bottom">
      <q-card style="width: 350px" class="q-pa-sm">
          <q-card-section>
              <q-list>
                  <template v-for="dish in dishes" :key="dish.dish._id">
                      <q-item-label header>{{ dish.dish.title }} ({{ dish.amount }} Portionen)</q-item-label>
                      <q-item v-for="ingredient, index in dish.dish.ingredients" :key="index">
                          <q-item-section side top>
                              <q-btn size="12px" flat dense round color="negative" icon="remove_circle_outline" @click.stop="onClickRemoveIngredient(dish, index)" />
                          </q-item-section>
                          <q-item-section clickable @click="onClickEditIngredient(dish, ingredient)">
                              <q-item-label>
                                  {{ ingredient.name }}
                                  <q-badge v-if="ingredient.subdish" class="q-mx-sm" color="secondary">{{ ingredient.subdish }}</q-badge>
                                  <q-badge v-if="ingredient.optional" class="q-mx-sm">Optional</q-badge>
                                  <q-chip removable dense :model-value="!!ingredient.due" @remove="ingredient.due = null" class="q-mx-sm" outline color="accent" text-color="white">
                                      {{ ingredient.due.fromNow() }}
                                  </q-chip>
                              </q-item-label>
                              <q-item-label caption>{{ ingredient.amount.value }} {{ ingredient.amount.unit }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                              <q-btn size="12px" flat dense round icon="trending_flat" @click.stop="onClickPostponeIngredient(ingredient)" />
                          </q-item-section>
                      </q-item>
                      <q-item clickable @click="onClickAddIngredient(dish)">
                          <q-item-section side top>
                              <q-btn size="12px" flat dense round color="primary" icon="add_circle_outline" />
                          </q-item-section>
                          <q-item-section>
                              <q-item-label>Add ingredient...</q-item-label>
                          </q-item-section>
                      </q-item>
                  </template>
              </q-list>
          </q-card-section>

          <q-separator inset />

          <q-card-actions align="right">
              <q-btn flat color="primary" label="Add to list" @click="onClickAddToList" />
          </q-card-actions>
      </q-card>
  </q-dialog>

   <AddIngredientDialog v-model="addIngredientDialog.show" @add="onClickAddIngredientDialogAdd" />
  <EditIngredientDialog v-model="editIngredientDialog.show" :ingredient="editIngredientDialog.ingredient" @save="onClickEditIngredientDialogSave" />

</template>

<script setup>
import { ref, watch, computed, inject } from 'vue';
import { useQuasar, copyToClipboard } from 'quasar';
import _ from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import AddIngredientDialog from './addIngredient.dialog.component.vue';
import EditIngredientDialog from './editIngredient.dialog.component.vue';

const show = defineModel();
const props = defineProps({
  dishes: Array
});
const emit = defineEmits(['add']);

// const $notify = inject('notify');

const dishes = ref(_.cloneDeep(props.dishes));
const shoppingList = ref(null);
const postponeIngredientDialog = ref({ show: false });

const addIngredientDialog = ref({
  show: false,
  dish: null,
  ingredient: {}
});

const editIngredientDialog = ref({
  show: false,
  dish: null,
  ingredient: null
});

watch(() => props.dishes, (newValue) => {
dishes.value = _.cloneDeep(newValue);
});

const onClickAddToList = () => {
  const ingredients = dishes.value.flatMap(dish => dish.dish.ingredients);
  emit('add', ingredients);
  show.value = false;
};

const onClickAddIngredient = (dish) => {
  addIngredientDialog.value.dish = dish;

  addIngredientDialog.value.show = true;
};

const onClickAddIngredientDialogAdd = (ingredient) => {
  addIngredientDialog.value.dish.dish.ingredients.push(ingredient);
};

const onClickEditIngredient = (dish, ingredient, index) => {
  editIngredientDialog.value.dish = dish;
  editIngredientDialog.value.ingredient = ingredient;

  editIngredientDialog.value.show = true;
};

const onClickEditIngredientDialogSave = (ingredient) => {
  editIngredientDialog.value.ingredient.name = ingredient.name;
  editIngredientDialog.value.ingredient.amount = ingredient.amount;

};

const onClickRemoveIngredient = async (dish, index) => {
  dish.dish.ingredients.splice(index, 1);
};

const onClickPostponeIngredient = (ingredient) => {
  if (!ingredient.due) {
    ingredient.due = dayjs().add(1, 'd');
  }
  else {
    ingredient.due = ingredient.due.add(1, 'd');
  }
};
</script>
