<template>
  <base-layout />
  <sign-up-modal :visible="$props.isSignUp" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import SignUpModal from '@/components/pages/SignUpModal.vue';
import api from '@/api';

export default defineComponent({
  name: 'Home',
  components: { SignUpModal, BaseLayout },
  props: {
    isSignUp: {
      type: String,
      default: 'false',
    },
  },
  setup() {
    const store = useStore();
    const token = window.sessionStorage.getItem('token');
    const isShowSignIn = ref(false);

    onMounted(async () => {
      if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        api.apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        await store.dispatch('user/fetchProfile');
      }
    });

    return {
      isShowSignIn,
    };
  },
});
</script>
