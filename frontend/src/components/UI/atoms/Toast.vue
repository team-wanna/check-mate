<template>
  <div class="toast-box">
    <transition-group name="slide">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
      >
        <span class="toast-content">
          {{ toast.message }}
        </span>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useToast from '@/composables/toast';

export default defineComponent({
  name: 'Toast',
  setup() {
    const { toasts } = useToast();

    return {
      toasts,
    };
  },
});
</script>

<style lang="scss" scoped>
.toast-box {
  position: fixed;
  margin: 0 auto;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.toast {
  width: 300px;
  height: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  &-content {
    font-size: $--font-size-medium;
    color: #ffffff;
  }
}
.toast--success {
  background-color: $--color-success;
}
.toast--danger {
  background-color: $--color-danger;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0%);
}
</style>
