<template>
  <div v-if="isShow" class="loading-mask">
    <div class="loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle r="20" cx="50" cy="50" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoadingMask',
  setup() {
    const isShow = computed(
      () => useStore().getters['loadingMask/getShowLoadingMask'],
    );

    return {
      isShow,
    };
  },
});
</script>

<style scoped lang="scss">
.loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: hsla(0, 0%, 100%, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
}

.loading-spinner {
  top: 50%;
  width: 100%;
  text-align: center;
  position: absolute;

  @keyframes loading-rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  .circular {
    height: 42px;
    width: 42px;
    animation: loading-rotate 2s linear infinite;
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }

  .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #409eff;
    stroke-linecap: round;
  }
}
</style>
