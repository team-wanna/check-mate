<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { loginGoogleAPI } from '@/api/modules/auth';
import router from '@/router';
import api from '@/api';

export default defineComponent({
  name: 'GoogleLogin',
  setup() {
    const url: URL = new URL(window.location.href);

    const login = async (_url: URL) => {
      const code = _url.searchParams.get('code');
      if (code) {
        try {
          const store = useStore();
          const { data } = await loginGoogleAPI(code);
          const { token, name, profileImageUrl } = data.data[0];

          store.commit('setToken', token);
          window.localStorage.setItem('token', token);

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          api.apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

          if (name) {
            store.commit('user/setName', name);
            store.commit('user/setProfileImageUrl', profileImageUrl);
            store.commit('user/setUserState', 'loggedIn');
          } else {
            store.commit('user/setUserState', 'signUp');
          }
          await router.push({ name: 'Home' });
        } catch (error) {
          console.error(error);
        }
      }
    };

    login(url);
  },
});
</script>

<style scoped></style>
