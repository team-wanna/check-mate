<template>
  <base-layout />
  <sign-in-modal v-model:visible="isShowSignIn" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import SignInModal from '@/components/pages/SignInModal.vue';

export default defineComponent({
  name: 'Home',
  components: { SignInModal, BaseLayout },
  setup() {
    const store = useStore();
    const userState = computed(() => store.getters['user/getUserState']);
    const isShowSignIn = ref(false);

    if (userState.value === 'signUp') {
      isShowSignIn.value = true;
    }

    return {
      isShowSignIn,
    };
  },
});
</script>
