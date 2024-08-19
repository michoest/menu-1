<template>
  <q-dialog v-model="show" position="bottom" @hide="clearInputs">
      <q-card style="width: 350px">
          <q-card-section>
              <div class="q-px-md">
                  <div class="q-gutter-y-xs column">
                      <q-input class="text-body1" borderless v-model="item.name" dense placeholder="Name" autofocus @keyup.enter="onClickAdd" />
                      <q-input v-show="showFields.notes" borderless v-model="item.notes" dense placeholder="Notes" @keyup.enter="onClickAdd">
                          <template v-slot:prepend><q-icon size="xs" name="notes" /></template>
                      </q-input>
                      <q-input v-show="showFields.category" borderless v-model="item.category" dense placeholder="Category" @keyup.enter="onClickAdd">
                          <template v-slot:prepend><q-icon size="xs" name="category" /></template>
                      </q-input>
                      <q-input v-show="showFields.due" borderless v-model="item.due" dense placeholder="Due" @keyup.enter="onClickAdd">
                          <template v-slot:prepend>
                              <q-icon size="xs" name="alarm_on">
                                  <q-popup-proxy v-model="showFields.date" cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="item.due" minimal mask="YYYY-MM-DD" @update:model-value="showFields.date = false" />
                                  </q-popup-proxy>
                              </q-icon>
                          </template>
                      </q-input>
                  </div>
              </div>
          </q-card-section>

          <q-card-actions class="q-px-md">
              <q-btn :color="showFields.notes ? 'primary' : 'grey'" flat icon="notes" size="sm" round @click="onClickToggleShowNotes" />
              <q-btn :color="showFields.category ? 'primary' : 'grey'" flat icon="category" size="sm" round @click="onClickToggleShowCategory" />
              <q-btn :color="showFields.due ? 'primary' : 'grey'" flat icon="alarm_on" size="sm" round @click="onClickToggleShowDue" />
              <q-space />
              <q-btn color="primary" :disable="!item.name" flat @click="onClickAdd">Add</q-btn>
          </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script setup>
defineOptions({ name: 'ListAddItemDialog' });
const show = defineModel();
const emit = defineEmits(['add']);

import { ref, watch, computed } from 'vue';
import _ from 'lodash';

const item = ref({
  name: '',
  notes: '',
  category: '',
  due: null,
});
const parent = ref(null);
const showFields = ref({
  notes: false,
  category: false,
  due: false
});

const onClickToggleShowNotes = () => {
  showFields.value.notes = !showFields.value.notes;

  if (!showFields.value.notes) {
      item.value.notes = '';
  }
};

const onClickToggleShowCategory = () => {
  showFields.value.category = !showFields.value.category;

  if (!showFields.value.category) {
      item.value.category = '';
  }
};

const onClickToggleShowDue = () => {
  showFields.value.due = !showFields.value.due;

  if (!showFields.value.due) {
      item.value.due = null;
  }
};

const onClickAdd = () => {
  show.value = false;
  emit('add', _.cloneDeep(item.value));
};

const clearInputs = () => {
  item.value = {
      name: '',
      notes: '',
      category: '',
      due: null
  };

  showFields.value = {
      notes: false,
      category: false,
      due: false,
  };
};
</script>
