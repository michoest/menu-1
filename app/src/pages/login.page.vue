<template>
  <q-page class="flex flex-center">
      <q-card style="width: 350px; max-width: 90vw;">
          <q-card-section>
              <div class="text-h6 text-center">Login</div>
          </q-card-section>

          <q-card-section>
              <q-form @submit="onClickLogin" class="q-gutter-md">
                  <q-input filled v-model="loginForm.email" label="E-mail" />
                  <q-input filled v-model="loginForm.password" label="Password" type="password" />

                  <div class="row justify-center q-mt-md">
                      <q-btn label="Login" type="submit" color="primary" />
                      <q-btn to="/signup" label="Sign up" flat class="q-ml-md" disable />
                  </div>
              </q-form>
          </q-card-section>
      </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'stores/store';

const store = useStore();
const $q = useQuasar();

defineOptions({
  name: 'LoginPage'
});

onMounted(async () => {
  store.global.status = 'ok';
});

const loginForm = ref({ email: '', password: '' });

const onClickLogin = async () => {
  await store.login(loginForm.value);
};

</script>

<style>
.q-card {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
}
</style>
