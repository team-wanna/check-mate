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
        <span class="sign-in-btn" @click="clickSignIn">가입 완료</span>
      </div>
    </template>
  </base-modal>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import BaseModal from '../templates/BaseModal.vue';
import { editProfileAPI } from '@/api/modules/auth';

export default defineComponent({
  name: 'SignInModal',
  components: { BaseModal },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const nickname = ref('');
    const errorMsg = ref('');
    const isShow = computed({
      get: () => props.visible,
      set: (val) => emit('update:visible', val),
    });

    const singIn = async () => {
      try {
        if (!nickname.value) {
          errorMsg.value = '닉네임을 입력하세요!😤';
          return;
        }
        const data = await editProfileAPI({ name: nickname.value });
        console.log('data: ', data);
        isShow.value = false;
      } catch (error) {
        errorMsg.value = '중복된 닉네임입니다😥';
        console.error(error);
      }
    };
    const clickSignIn = () => {
      singIn();
    };

    return {
      nickname,
      errorMsg,
      isShow,
      clickSignIn,
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
  margin-bottom: 15px;
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
  .sign-in-btn {
    padding: 5px 10px;
    border-radius: 5px;
    border: 3px solid $--color-primary;
  }
}
</style>
