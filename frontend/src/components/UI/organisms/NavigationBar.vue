<template>
  <nav class="nav-container">
    <div class="item-container">
      <section class="item-container__item-left" @click="clickHomeBtn">
        <fa :icon="['fas', 'chess']" class="home-icon" />
        <a>체크메이트</a>
      </section>
      <section class="item-container__item-right">
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

    return {
      clickHomeBtn,
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
  cursor: pointer;

  a {
    font-size: 36px;
  }
}

.home-icon {
  margin-right: 10px;
  font-size: 50px;
}
</style>
