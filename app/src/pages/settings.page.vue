<template>
  <q-page>
    <q-list class="q-pt-md">
      <q-item-label header>Backend</q-item-label>
      <q-item>
        <q-item-section>
          <q-input v-model="store.api" placeholder="API URL">
            <template v-slot:append>
              <q-btn round dense flat icon="network_check" :color="apiStatus ? 'positive' : 'negative'" @click="checkAPI" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>

      <!-- <q-separator inset spaced="xl" />

      <q-item class="q-pb-lg">
          <q-item-section avatar>
              <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
              </q-avatar>
          </q-item-section>

          <q-item-section>
              <q-item-label>{{ user.name.first }} {{ user.name.last }}</q-item-label>
              <q-item-label caption lines="1">{{ user.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
              <q-btn flat round icon="more_horiz" color="grey" @click="onClickAccountActions" />
          </q-item-section>
      </q-item>
      <q-item>
          <q-item-section>
              <q-btn color="negative" outline @click="onClickSignout">Sign out</q-btn>
          </q-item-section>
      </q-item> -->
      <q-item-label header>Date of last build</q-item-label>
      <q-item>
        <q-item-label>{{ dayjs(buildDate) }}</q-item-label>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
defineOptions({ name: 'SettingsPage' });

import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { buildDate } from 'boot/build-info'
import { useStore } from 'src/stores/store';

const store = useStore();

const apiStatus = ref(false);

const checkAPI = async () => {
  apiStatus.value = await store.checkAPI();
};

const user = {
  name: {
    first: 'Michael',
    last: 'Oesterle'
  },
  email: 'mail@michoest.com'
}

const onClickAccountActions = async () => {

};

const onClickSignout = async () => {

};

onMounted(async () => {
  await checkAPI();
});
</script>
