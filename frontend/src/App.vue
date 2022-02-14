<template>
  <navigation-bar />
  <router-view />
  <toast />
  <loading-mask />
</template>
<script>
import NavigationBar from '@/components/UI/organisms/NavigationBar.vue';
import Toast from '@/components/UI/atoms/Toast.vue';
import LoadingMask from '@/components/UI/atoms/LoadingMask.vue';

export default {
  components: { LoadingMask, NavigationBar, Toast },
};
</script>
