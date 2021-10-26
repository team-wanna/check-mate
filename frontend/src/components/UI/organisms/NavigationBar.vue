<template>
  <nav class="container">
    <fa :icon="['fas', 'chess']" class="home-icon" />
    <div class="item-container">
      <section class="item-container__item-left">
        <a>프로젝트</a>
      </section>
      <section class="item-container__item-right">
        <div class="menu-info" v-if="userState === 'loggedIn'">
          <fa class="alarm-icon" :icon="['far', 'bell']" />
          <fa class="profile-icon" :icon="['far', 'user-circle']" />
        </div>
        <a class="menu-login" v-else @click="clickLoginBtn">로그인</a>
      </section>
    </div>
  </nav>
  <login-modal v-model:visible="isShowLoginModal" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import LoginModal from '@/components/pages/LoginModal.vue';

export default defineComponent({
  name: 'NavigationBar',
  components: { LoginModal },
  props: {},
  setup() {
    const store = useStore();
    const userState = computed(() => store.getters['user/getUserState']);
    const isShowLoginModal = ref(false);
    const clickLoginBtn = () => {
      isShowLoginModal.value = true;
    };

    return { userState, isShowLoginModal, clickLoginBtn };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100px;
  border-bottom: $border solid 3px;
  align-items: center;
}
.item-container {
  width: 100%;
  height: 100%;
  margin: 0 200px 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 36px;
  }
  &__item-right {
    display: flex;
    margin-right: 20px;
    .menu-info {
      font-size: 36px;
      .alarm-icon {
        margin-right: 10px;
      }
    }
  }
}

.home-icon {
  margin-left: 200px;
  font-size: 50px;
}
</style>
