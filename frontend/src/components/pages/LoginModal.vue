<template>
  <base-modal v-model:visible="isShow">
    <template #main>
      <h1>체크메이트에 오신 것을 환영합니다!</h1>
      <div class="login-btn-container">
        <section>
          <social-login-button type="google" />
          <p>Google 로그인</p>
        </section>
        <section>
          <social-login-button type="facebook" />
          <p>Facebook 로그인</p>
        </section>
        <section>
          <social-login-button type="github" />
          <p>Github 로그인</p>
        </section>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import BaseModal from "@/components/templates/BaseModal.vue";
import SocialLoginButton from "@/components/UI/atoms/SocialLoginButton.vue";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "LoginModal",
  components: { SocialLoginButton, BaseModal },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const isShow = computed({
      get: () => props.visible,
      set: (value) => emit("update:visible", value),
    });

    return {
      isShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-btn-container {
  margin-top: 30px;
  display: flex;
  align-items: center;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 225px;
    p {
      margin: 8px 0;
    }
  }
}
</style>
