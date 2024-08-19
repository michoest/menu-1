<template>
  <q-page>
    <q-list v-if="ingredients.length > 0" class="q-pt-md">
      <q-item class="flex justify-center">
          <q-input v-model="search" standout rounded dense clearable placeholder="Suchen" style="width: 60%; min-width: 300px;">
              <template v-slot:prepend>
                  <q-icon name="search" />
              </template>
          </q-input>
      </q-item>

      <q-item v-for="ingredient, index in filteredIngredients" :key="ingredient">
        <q-item-section>
          <q-item-label>
            <div class="row q-col-gutter-sm items-center">
              <div class="col-6">
                <q-input v-model="ingredient.name" dense @keyup.enter="onClickSave" />
              </div>
              <div class="col-6">
                <q-select v-model="ingredient.vendor" :options="vendors" dense @keyup.enter="onClickSave" />
              </div>
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat dense round color="negative" icon="delete_outline" @click="onClickRemoveIngredient(index)"></q-btn>
        </q-item-section>
      </q-item>
      <q-item clickable @click="onClickAddIngredient">
        <q-item-section side top>
          <q-btn size="12px" flat dense round color="primary" icon="add_circle_outline" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Add ingredient...</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom" :offset="[0, -28]" style="z-index: 6000;">
      <q-btn fab icon="cloud_upload" color="accent" @click="onClickSave" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
defineOptions({ name: 'VendorsPage' });

import { ref, onMounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router';
import _ from 'lodash';
import { useStore } from 'src/stores/store';

const $notify = inject('notify');
const $router = useRouter();
const search = ref('');
const store = useStore();

const ingredients = ref([]);

const vendors = ['Markt (Käse)', 'Markt (Metzger)', 'Markt (Müsetand)', 'Markt (Rischkäsetand)', 'Markt (Toffeltand)', 'Markt (Zeit für Rot)', 'Mazon', 'Natura', 'Nette', 'Online', 'We', 'We (Obst & Müse)', 'We (Milchdukts)', 'We (Käse)', 'Kelhuhnladen', 'Nerladen', ].sort();

onMounted(async () => {
  await store.fetchMenu();
  ingredients.value = store.menu.ingredients.toSorted((a, b) => a.name.localeCompare(b.name));
});

const filteredIngredients = computed(() => {
  return search.value ? ingredients.value.filter(ingredient => JSON.stringify(ingredient).toLowerCase().includes(search.value.toLowerCase())) : ingredients.value;
});

const onClickAddIngredient = () => {
  ingredients.value.push({ name: '', vendor: '' });
};

const onClickRemoveIngredient = (index) => {
  ingredients.value.splice(index, 1);
}

const onClickSave = async () => {
  if (await store.saveVendors(ingredients.value)) {
    $notify(`Vendors updated!`);
  }
};

</script>
