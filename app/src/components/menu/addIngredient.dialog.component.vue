<template>
  <q-dialog v-model="show" position="bottom" @hide="clearInputs">
      <q-card style="width: 350px" class="q-px-md">
          <q-card-section>
              <div class="q-px-md">
                  <div class="q-gutter-y-xs column">
                      <q-input class="text-body1" borderless v-model="ingredient.name" dense placeholder="Title" autofocus @keyup.enter="onClickAdd"/>
                      <q-input borderless v-model="ingredient.amount.value" dense placeholder="Value" @keyup.enter="onClickAdd">
                          <template v-slot:prepend><q-icon size="xs" name="123" /></template>
                      </q-input>
                      <q-input borderless v-model="ingredient.amount.unit" dense placeholder="Unit" @keyup.enter="onClickAdd">
                          <template v-slot:prepend><q-icon size="xs" name="category" /></template>
                      </q-input>
                  </div>
              </div>
          </q-card-section>

          <q-card-actions align="right">
              <q-btn flat color="primary" :disable="!ingredient.name" @click="onClickAdd">Add</q-btn>
          </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import _ from 'lodash';

const show = defineModel();
const emit = defineEmits(['add']);

const ingredient = ref({
  name: '',
  amount: {
      value: null,
      unit: ''
  }
});

const onClickAdd = () => {
  show.value = false;
  
  if (ingredient.value.amount.value == '' && ingredient.value.amount.unit == '') {
      ingredient.value.amount = { value: null, unit: null };
  }
  emit('add', _.cloneDeep(ingredient.value));
}

const clearInputs = () => {
  ingredient.value = {
      name: '',
      amount: {
          value: null,
          unit: ''
      }
  };
};
</script>
