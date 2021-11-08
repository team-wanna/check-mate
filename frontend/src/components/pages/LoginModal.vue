<template>
  <base-modal v-model:visible="isShow">
    <template #main>
      <p class="title">체크메이트에 오신 것을 환영합니다!</p>
      <div class="login-btn-container">
        <section class="login-btn-container__content">
          <social-login-button type="google" />
          <p class="content-title">Google 로그인</p>
        </section>
        <section class="login-btn-container__content">
          <social-login-button type="facebook" />
          <p class="content-title">Facebook 로그인</p>
        </section>
        <section class="login-btn-container__content">
          <social-login-button type="github" />
          <p class="content-title">Github 로그인</p>
        </section>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BaseModal from '@/components/templates/BaseModal.vue';
import SocialLoginButton from '@/components/UI/atoms/SocialLoginButton.vue';

export default defineComponent({
  name: 'LoginModal',
  components: { SocialLoginButton, BaseModal },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const isShow = computed({
      get: () => props.visible,
      set: (value) => emit('update:visible', value),
    });

    return {
      isShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: $--font-size-large;
}
.login-btn-container {
  margin-top: 60px;
  display: flex;
  align-items: center;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    .content-title {
      margin: 8px 0;
      font-size: $--font-size-medium;
    }
  }
}
</style>
