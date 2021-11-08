<template>
  <nav class="nav-container">
    <fa :icon="['fas', 'chess']" class="home-icon" />
    <div class="item-container">
      <section class="item-container__item-left">
        <a @click="test">프로젝트</a>
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
import useToast from '@/composables/toast';

export default defineComponent({
  name: 'NavigationBar',
  components: { LoginButton },
  props: {},
  setup() {
    const { triggerToast } = useToast();
    const test = () => {
      triggerToast('회원가입 완료');
    };

    return {
      test,
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
}

.home-icon {
  margin-left: 200px;
  font-size: 50px;
}
</style>
