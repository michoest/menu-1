<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <loading-page v-if="store.global.status == 'loading'" />
      <router-view v-else />
    </q-page-container>

    <q-footer class="bg-grey-2 text-primary">
      <q-separator />
      <q-tabs v-if="store.user" v-model="tab" align="justify">
        <q-route-tab name="menu" icon="restaurant_menu" to="/menu" />
        <q-route-tab name="list" icon="list" to="/list" />
        <q-route-tab name="vendors" icon="storefront" to="/vendors" />
        <q-route-tab name="settings" to="/settings">
          <q-avatar class="bg-primary text-white" size="sm">{{ store.user.name.first[0] }}<q-badge v-if="store.global.sse" color="green" rounded floating /></q-avatar>
        </q-route-tab>
      </q-tabs>
      <q-tabs v-else v-model="tab" align="justify">
        <q-route-tab name="login" icon="login" to="/login" />
        <q-route-tab name="network" icon="router" to="/network" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
defineOptions({ name: 'AppLayout' });

import { ref, onBeforeMount, watch } from 'vue';
import { useStore } from 'stores/store';
import LoadingPage from 'src/pages/loading.page.vue';

const tab = ref('menu');
const store = useStore();

onBeforeMount(async () => {
    await store.fetch();
});

watch(() => store.persistent.token, async () => {
    await store.fetch();
});

</script>
