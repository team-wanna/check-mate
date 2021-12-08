<template>
  <div class="login-button-container" v-if="userState === 'loggedIn'">
    <div class="alarm-container">
      <fa class="icon alarm-icon" :icon="['far', 'bell']" />
    </div>
    <div class="profile-container">
      <button @click="clickProfile" @blur="blurProfile">
        <img
          v-if="profileImage"
          class="profile-icon--custom"
          :src="profileImage"
          alt="profile icon"
        />
        <fa
          v-else
          class="profile-icon--common"
          :icon="['far', 'user-circle']"
        />
      </button>

      <div class="profile-popup" v-show="isShowProfilePopup">
        <p
          @click="clickMyProfile"
          @mousedown.prevent
          class="profile-popup-item"
        >
          내 정보
        </p>
        <p
          @click="clickLogoutBtn"
          @mousedown.prevent
          class="profile-popup-item"
        >
          로그아웃
        </p>
      </div>
    </div>
  </div>
  <a class="icon btn--primary" v-else @click="clickLoginBtn">로그인</a>
  <login-modal v-model:visible="isShowLoginModal" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import LoginModal from '@/components/pages/LoginModal.vue';

export default defineComponent({
  name: 'LoginButton',
  components: { LoginModal },
  setup() {
    const store = useStore();
    const userState = computed(() => store.getters['user/getUserState']);
    const isShowProfilePopup = ref(false);
    const profileImage = computed(
      () => store.getters['user/getProfileImageUrl'],
    );
    const isShowLoginModal = ref(false);
    const blurProfile = () => {
      isShowProfilePopup.value = false;
    };
    const clickProfile = () => {
      isShowProfilePopup.value = !isShowProfilePopup.value;
    };
    const clickLoginBtn = () => {
      isShowLoginModal.value = true;
    };
    const clickLogoutBtn = () => {
      window.sessionStorage.clear();
      store.commit('user/setUserState', 'loggedOut');
      router.push('/');
    };
    const clickMyProfile = () => {
      router.push('/profile');
      isShowProfilePopup.value = false;
    };

    return {
      userState,
      profileImage,
      isShowLoginModal,
      isShowProfilePopup,
      blurProfile,
      clickProfile,
      clickLoginBtn,
      clickLogoutBtn,
      clickMyProfile,
    };
  },
});
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
  font-size: $--font-size-medium;
}
.login-button-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
  .alarm-icon {
    margin-right: 10px;
  }
  .profile-icon--common {
    font-size: $--font-size-large;
  }
  .profile-icon--custom {
    width: 50px;
    height: 50px;
    border-radius: 30px;
  }
}
.profile-popup {
  position: absolute;
  width: 200px;
  border: 1px solid $--color-border;
  border-radius: 5px;
  background-color: #ffffff;
  &-item {
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    transition: ease-in background-color;
  }
  &-item:hover {
    background-color: $--color-primary;
  }
}
</style>
