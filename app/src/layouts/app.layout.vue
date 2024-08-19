<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header class="bg-white text-primary">
        <q-toolbar>
          <q-space></q-space>

          <q-btn flat round dense icon="account_circle" to="/settings" />
        </q-toolbar>
      </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-2 text-primary">
      <q-separator />
      <q-tabs v-model="tab" align="justify">
        <q-route-tab v-if="store.user" name="menu" icon="restaurant_menu" to="/menu" />
        <q-route-tab v-if="store.user" name="list" icon="list" to="/list" />
        <q-route-tab name="vendors" icon="storefront" to="/vendors" />
        <q-route-tab name="settings" icon="account_circle" to="/settings" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
defineOptions({ name: 'AppLayout' });

import { ref } from 'vue'
import { useStore } from 'stores/store'

const tab = ref('menu')
const store = useStore()
</script>
