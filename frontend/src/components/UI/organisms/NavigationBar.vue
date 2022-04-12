<template>
  <nav class="nav-container">
    <div class="item-container">
      <section class="item-container--left">
        <div class="item-container__content" @click="clickHomeBtn">
          <fa :icon="['fas', 'chess']" class="home-icon" />
          <a>체크메이트</a>
        </div>
      </section>
      <section class="item-container--right">
        <login-button />
      </section>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginButton from '@/components/UI/atoms/LoginButton.vue';
import router from '@/router';

export default defineComponent({
  name: 'NavigationBar',
  components: { LoginButton },
  setup() {
    const clickHomeBtn = () => {
      router.push({ name: 'Home' });
    };
    const clickProjectBtn = () => {
      router.push({ name: 'Project' });
    };

    return {
      clickHomeBtn,
      clickProjectBtn,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-container {
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100px;
  border-bottom: $--color-border solid 3px;
  align-items: center;
  background-color: #ffffff;
  z-index: 100;
}

.item-container {
  width: 100%;
  height: 100%;
  margin: 0 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &--left {
    height: 100%;
    display: flex;
  }

  &__content {
    height: 100%;
    font-size: 36px;
    margin-right: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;

    .home-icon {
      margin-right: 10px;
      font-size: 50px;
    }

    &--active {
      color: $--color-primary;
      border-bottom: $--color-primary 4px solid;
    }

    &:hover {
      color: $--color-primary;
    }
  }
}
</style>
