<template>
  <navigation-bar />
  <router-view />
  <toast />
</template>
<script>
import NavigationBar from '@/components/UI/organisms/NavigationBar.vue';
import Toast from '@/components/UI/atoms/Toast.vue';

export default {
  components: { NavigationBar, Toast },
};
</script>
