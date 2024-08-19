<template>
  <q-page>
    <q-list v-if="dishes.length > 0" class="q-pt-md">
      <q-item class="flex justify-center">
                <q-input v-model="search" standout rounded dense clearable placeholder="Mmmmhhhes Schompf" style="width: 60%; min-width: 300px;">
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </q-item>

            <q-expansion-item expand-icon-toggle switch-toggle-side
                v-for="dish in filteredDishes" :key="dish.dish.id" :content-inset-level="1">
                    <template v-slot:header>
                        <q-item-section>
                            <q-item-label>{{ dish.dish.title }}</q-item-label>
                            <q-item-label caption>Übliche Menge: {{ dish.dish.standardAmount }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <div class="text-grey-8 q-gutter-xs flex items-center">
                                <q-btn color="red" :disable="dish.amount == 0" flat round icon="remove"
                                    @click="onClickDecrementDish(dish)" />
                                <span>{{ dish.amount }}</span>
                                <q-btn color="green" flat round icon="add" @click="onClickIncrementDish(dish)" />
                            </div>
                        </q-item-section>
                    </template>
                    <q-item>
                      <q-item-section>
                        <div>
                          <span class="text-bold">Zutaten pro Portion:</span> {{ dish.dish.ingredients.map(ingredient => ingredientToString(ingredient)).join(', ') }}
                        </div>
                        <div v-if="dish.dish.subdishes && dish.dish.subdishes.length > 0" class="q-mt-md">
                          <span class="text-bold">Sub-dishes:</span> {{ dish.dish.subdishes.map(subdish => `${dishes.find(dish => dish.dish.id == subdish.dish).dish.title} (Menge: ${subdish.amountFactor})`).join(', ') }}
                        </div>
                        </q-item-section>
                      <q-item-section side>
                        <q-btn flat round icon="edit" @click="onClickEditDish(dish.dish)" />
                      </q-item-section>
                    </q-item>
                    <q-separator inset />

                </q-expansion-item>
    </q-list>

    <q-page-sticky position="bottom" :offset="[0, -28]" style="z-index: 6000;">
      <q-btn fab icon="checklist" color="accent" @click="onClickChooseIngredients" :disabled="disableChooseIngredients" />
    </q-page-sticky>

    <ChooseIngredientsDialog
        v-model:model-value="chooseIngredientsDialog.show"
        :dishes="chooseIngredientsDialog.dishes"
        @add="onClickAdd"
    />

    <EditDishDialog v-model="editDishDialog.show" :dish="editDishDialog.dish" @save="onClickEditDishSaveDish" />
  </q-page>
</template>

<script setup>
defineOptions({ name: 'MenuPage' });

import { ref, onMounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router';
import _ from 'lodash';
import ChooseIngredientsDialog from 'components/menu/chooseIngredients.dialog.component.vue';
import EditDishDialog from 'components/menu/editDish.dialog.component.vue';
import { useStore } from 'src/stores/store';

const $notify = inject('notify');
const $router = useRouter();
const disableChooseIngredients = ref(true);
const search = ref('');
const chooseIngredientsDialog = ref({ show: false, dishes: [] });
const editDishDialog = ref({ show: false, dish: {} });
const store = useStore();

const dishes = ref([]);

const onClickIncrementDish = function (dish) {
    dish.amount = (dish.amount == 0) ? dish.dish.standardAmount : dish.amount + 1;
    disableChooseIngredients.value = false;
}

const onClickDecrementDish = function (dish) {
    dish.amount -= 1;

    disableChooseIngredients.value = _.sum(dishes.value.map(dish => dish.amount)) == 0;
}

const onClickChooseIngredients = () => {
    chooseIngredientsDialog.value.dishes = _.cloneDeep(dishes.value.filter(dish => dish.amount > 0));

    chooseIngredientsDialog.value.dishes.forEach(dish => {
        dish.dish.ingredients.forEach(ingredient => {
            ingredient.amount.value = ingredient.amount.unit != null ? ingredient.amount.value * dish.amount : ingredient.amount.value;
        });

        dish.dish.subdishes?.forEach(subdish => {
            subdish.dish = dishes.value.find(dish => dish.dish.id == subdish.dish).dish;
            subdish.dish.ingredients.forEach(ingredient => {
                dish.dish.ingredients.push({ name: ingredient.name, amount: { value: ingredient.amount.value != null ? ingredient.amount.value * dish.amount * subdish.amountFactor : null, unit: ingredient.amount.unit }, optional: ingredient.optional || subdish.optional, subdish: subdish.dish.title });
            });
        });
    });

    chooseIngredientsDialog.value.show = true;
};

const onClickAdd = async (ingredients) => {
  if (await store.addToList(ingredients)) {
      $notify(`Ingredients added to list!`, { actions: [{ label: 'Show', color: 'white', handler: () => { $router.push(`/list`); } }] });
  }

  dishes.value.forEach(dish => dish.amount = 0);
  disableChooseIngredients.value = true;
};

const onClickEditDish = (dish) => {
  editDishDialog.value.dish = dish;
  editDishDialog.value.show = true;
};

const onClickEditDishSaveDish = async (dish) => {
  if (await store.editDish(dish)) {
      $notify(`${dish.title} edited!`);
  }
};

onMounted(async () => {
  await store.fetchMenu();
  dishes.value = store.menu.dishes.map(dish => ({ dish: dish, amount: 0 })).sort((a, b) => a.dish.title.localeCompare(b.dish.title));
})

const filteredDishes = computed(() => {
  return search.value ? dishes.value.filter(dish => JSON.stringify(dish.dish).toLowerCase().includes(search.value.toLowerCase())) : dishes.value;
});

const ingredientToString = (ingredient) => {
    if (ingredient.amount.unit == null) {
        return ingredient.name;
    }
    else {
        if (ingredient.amount.unit == '') {
            return `${ingredient.amount.value} ${ingredient.name}`;
        }
        else {
            return `${ingredient.amount.value} ${ingredient.amount.unit} ${ingredient.name}`;
        }
    }
};
</script>
