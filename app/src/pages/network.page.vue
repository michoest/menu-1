<template>
  <q-page>
    <q-list class="q-pt-md">
      <q-item-label header>Backend</q-item-label>
      <q-item>
        <q-item-section>
          <q-input v-model="api" placeholder="API URL">
            <template v-slot:append>
              <q-btn round dense flat icon="network_check" :color="apiStatus ? 'positive' : 'negative'" @click="checkAPI" />
              <q-btn round dense flat color="primary" icon="sync" @click="setAPI" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>

      <q-item-label header>Date of last build</q-item-label>
      <q-item>
        <q-item-label>{{ dayjs(buildDate) }}</q-item-label>
      </q-item>
    </q-list>
    <div>
      <p>Current time: {{ currentTime }}</p>
      <p v-if="error">Error: {{ error }}</p>
      <q-btn @click="onClickSse">SSE</q-btn>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({ name: 'NetworkPage' });

import { onMounted, ref, inject } from 'vue';
import dayjs from 'dayjs';
import { buildDate } from 'boot/build-info'
import { useStore } from 'src/stores/store';

const $notify = inject('notify');
const store = useStore();

const api = ref('');
const apiStatus = ref(false);

const checkAPI = async () => {
  apiStatus.value = await store.checkAPI(api.value);
};

const setAPI = () => {
  store.setAPI(api.value);

  $notify(`API updated!`);
}

const user = {
  name: {
    first: 'Michael',
    last: 'Oesterle'
  },
  email: 'mail@michoest.com'
}

const currentTime = ref(null);
const error = ref(null);

const onClickAccountActions = async () => {

};

const onClickSignout = async () => {

};

onMounted(async () => {
  api.value = store.persistent.api;
  await checkAPI();
});

const onClickSse = async () => {
  await store.connectToSSE();
};

</script>
