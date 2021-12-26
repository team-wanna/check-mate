<template>
  <base-layout />
  <sign-in-modal v-model:visible="isShowSignIn" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import SignInModal from '@/components/pages/SignInModal.vue';
import api from '@/api';
import { getProfile } from '@/api/modules/users';

export default defineComponent({
  name: 'Home',
  components: { SignInModal, BaseLayout },
  setup() {
    const store = useStore();
    const userState = computed(() => store.getters['user/getUserState']);
    const isShowSignIn = ref(false);

    onMounted(async () => {
      const token = window.sessionStorage.getItem('token');
      if (userState.value === 'signUp') {
        isShowSignIn.value = true;
      } else if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        api.apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        const { data } = await getProfile();
        const { name, intro, profileImageUrl } = data.data[0];
        store.commit('user/setName', name);
        store.commit('user/setIntro', intro);
        store.commit('user/setProfileImageUrl', profileImageUrl);
        store.commit('user/setUserState', 'loggedIn');
      }
    });

    return {
      isShowSignIn,
    };
  },
});
</script>
