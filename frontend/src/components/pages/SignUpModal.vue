<template>
  <base-modal v-model:visible="isShow">
    <template #main>
      <p class="title">처음 오셨네요~😉</p>
      <p class="sub-title">닉네임을 입력해주세요!</p>
      <div class="nickname-container">
        <label class="nickname-container__label">닉네임</label>
        <input
          class="nickname-container__input"
          type="text"
          v-model="nickname"
        />
      </div>
      <p>{{ errorMsg }}</p>
    </template>
    <template #footer>
      <div class="footer-container">
        <span class="btn--primary" @click="clickSignUp">가입하기</span>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import BaseModal from '../templates/BaseModal.vue';
import useLoadingMask from '@/composables/loadingMask';

export default defineComponent({
  name: 'SignUpModal',
  components: { BaseModal },
  props: {
    visible: {
      type: String,
      default: 'false',
    },
  },
  setup(props) {
    const store = useStore();
    const nickname = ref('');
    const errorMsg = ref('');
    const isShow = ref(JSON.parse(props.visible));
    const { showLoadingMask, hideLoadingMask } = useLoadingMask();
    const singUp = async () => {
      try {
        if (!nickname.value) {
          errorMsg.value = '닉네임을 입력하세요😤';
          return;
        }
        await showLoadingMask();
        await store.dispatch('user/updateProfile', { name: nickname.value });
        isShow.value = false;
      } catch (error) {
        errorMsg.value = '중복된 닉네임입니다😥';
        console.error(error);
      } finally {
        await hideLoadingMask();
      }
    };
    const clickSignUp = () => {
      singUp();
    };

    return {
      nickname,
      errorMsg,
      isShow,
      clickSignUp,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: $--font-size-large;
  margin-bottom: 20px;
}

.sub-title {
  font-size: $--font-size-medium;
  margin: 15px 0;
}

.nickname-container {
  display: flex;
  font-size: $--font-size-medium;
  margin-bottom: 10px;

  .nickname-container__label {
    margin-right: 10px;
  }
}

.footer-container {
  display: flex;
  justify-content: center;
}
</style>
