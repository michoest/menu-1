<template>
  <q-dialog v-model="show" position="bottom" @before-show="initInputs" @hide="clearInputs">
      <q-card style="width: 350px">
          <q-card-section>
              <q-list>
                <q-item-label header>Name</q-item-label>
                <q-item>
                  <q-input class="text-body1" borderless v-model="dish.title" dense placeholder="Name" autofocus @keyup.enter="onClickSave"/>
                </q-item>

                <q-item-label header>Zutaten</q-item-label>
                <template v-for="ingredient, index in dish.ingredients" :key="index">
                  <q-item>
                    <q-item-section side>
                      <q-btn flat dense round color="negative" icon="remove_circle_outline" size="sm" @click="onClickRemoveIngredient(index)"></q-btn>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>
                        <q-input v-model="ingredient.name" filled dense placeholder="Title" autofocus  @keyup.enter="onClickSave"/>
                      </q-item-label>

                      <q-item-label>
                        <div class="row q-col-gutter-sm items-center">
                          <div class="col-6">
                            <q-input v-model="ingredient.amount.value" filled dense @keyup.enter="onClickSave">
                              <template v-slot:prepend><q-icon size="xs" name="123" /></template>
                            </q-input>
                          </div>
                          <div class="col-6">
                            <q-input v-model="ingredient.amount.unit" filled dense @keyup.enter="onClickSave">
                              <template v-slot:prepend><q-icon size="xs" name="category" /></template>
                            </q-input>
                          </div>
                        </div>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle dense v-model="ingredient.optional" icon="low_priority" color="primary" />
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                </template>

                <q-item clickable @click="onClickAddIngredient">
                  <q-item-section side top>
                    <q-btn size="12px" flat dense round color="primary" icon="add_circle_outline" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Add ingredient...</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item-label header>Übliche Menge</q-item-label>
                <q-item>
                  <q-input borderless v-model="dish.standardAmount" dense placeholder="Übliche Menge" autofocus @keyup.enter="onClickSave"/>
                </q-item>
              </q-list>
          </q-card-section>

          <q-card-actions align="right">
              <q-btn flat color="primary" :disable="dish.ingredients?.length == 0" @click="onClickSave">Save</q-btn>
          </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import _ from 'lodash';

const show = defineModel();
const props = defineProps({ dish: Object });
const emit = defineEmits(['save']);

const dish = ref(_.cloneDeep(props.dish));

const initInputs = () => {
  dish.value = _.cloneDeep(props.dish);
}

const onClickAddIngredient = () => {
  dish.value.ingredients.push({ name: '', amount: { value: null, unit: '' } })
};

const onClickRemoveIngredient = (index) => {
  dish.value.ingredients.splice(index, 1);
};

const clearInputs = () => {
  dish.value = {
    title: '',
    ingredients: [],
    standardAmount: 0
  }
};

const onClickSave = () => {
  show.value = false;

  dish.value.ingredients.forEach(ingredient => {
    if (!ingredient.amount && !ingredient.amount.unit) {
      ingredient.amount = { value: null, unit: null };
    }
  });

  emit('save', _.cloneDeep(dish.value));
}
</script>
