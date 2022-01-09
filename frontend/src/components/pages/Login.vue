<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { loginAPI } from '@/api/modules/auth';
import router from '@/router';
import { SocialType } from '@/utils/define';
import { LoginReq } from '@/api/modules/auth/types';

export default defineComponent({
  name: 'Login',
  setup() {
    const url = new URL(window.location.href);

    const login = async (_url: URL) => {
      const code = _url.searchParams.get('code');
      if (code) {
        try {
          const loginType = window.localStorage.getItem(
            'loginType',
          ) as SocialType;
          const loginReq: LoginReq = {
            type: loginType,
            code,
          };
          const { data } = await loginAPI(loginReq);
          const { token, name } = data.data[0];

          window.sessionStorage.setItem('token', token);

          await router.push({
            name: 'Home',
            params: { isSignUp: name ? 'false' : 'true' },
          });
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
