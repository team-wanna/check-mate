<template>
  <nav class="container">
    <fa :icon="['fas', 'chess']" class="home-icon" />
    <div class="item-container">
      <section class="item-container__item-left">
        <a>프로젝트</a>
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

export default defineComponent({
  name: 'NavigationBar',
  components: { LoginButton },
  props: {},
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
}

.home-icon {
  margin-left: 200px;
  font-size: 50px;
}
</style>
