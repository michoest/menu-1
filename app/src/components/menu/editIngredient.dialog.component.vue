<template>
  <q-dialog v-model="show" position="bottom" @hide="clearInputs">
      <q-card style="width: 350px" class="q-px-md">
          <q-card-section>
              <div class="q-px-md">
                  <div class="q-gutter-y-xs column">
                      <q-input class="text-body1" borderless v-model="ingredient.name" dense placeholder="Title" autofocus/>
                      <q-input borderless v-model="ingredient.amount.value" dense placeholder="Value">
                          <template v-slot:prepend><q-icon size="xs" name="123" /></template>
                      </q-input>
                      <q-input borderless v-model="ingredient.amount.unit" dense placeholder="Unit">
                          <template v-slot:prepend><q-icon size="xs" name="category" /></template>
                      </q-input>
                  </div>
              </div>
          </q-card-section>

          <q-card-actions align="right">
              <q-btn flat color="primary" :disable="!ingredient.name" @click="onClickSave">Save</q-btn>
          </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import _ from 'lodash';

const show = defineModel();
const props = defineProps({ ingredient: Object });
const emit = defineEmits(['save']);

const ingredient = ref(_.cloneDeep(props.ingredient));

const initInputs = () => {
  ingredient.value = _.cloneDeep(props.ingredient);
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

const onClickSave = () => {
  show.value = false;

  if (ingredient.value.amount.value == '' && ingredient.value.amount.unit == '') {
      ingredient.value.amount = { value: null, unit: null };
  }
  emit('save', _.cloneDeep(ingredient.value));
}
</script>
