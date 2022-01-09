<template>
  <base-layout />
  <sign-in-modal v-model:visible="isShowSignIn" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import SignInModal from '@/components/pages/SignInModal.vue';
import api from '@/api';

export default defineComponent({
  name: 'Home',
  components: { SignInModal, BaseLayout },
  setup() {
    const store = useStore();
    const isShowSignIn = ref(false);
    const url = new URL(window.location.href);
    const isSignUp = ref<boolean>(
      JSON.parse(url.searchParams.get('isSignUp') || 'false'),
    );

    onMounted(async () => {
      if (isSignUp.value) {
        isShowSignIn.value = true;
      } else {
        const token = window.sessionStorage.getItem('token');

        if (token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          api.apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
          await store.dispatch('user/fetchProfile');
        }
      }
    });

    return {
      isShowSignIn,
    };
  },
});
</script>
