<template>
  <teleport to="body">
    <div v-if="isShow" class="modal">
      <div class="container">
        <header class="base-modal-header">
          <div class="logo-container">
            <fa :icon="['fas', 'chess']" class="icon icon--large" />
          </div>
          <fa
            :icon="['far', 'window-close']"
            class="icon icon--large"
            @click="clickClose"
          />
        </header>
        <div class="base-modal-main">
          <slot name="main"></slot>
        </div>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BaseModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const isShow = computed({
      get: () => props.visible,
      set: (value) => emit('update:visible', value),
    });

    const clickClose = () => {
      isShow.value = false;
    };

    return {
      isShow,
      clickClose,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container {
  width: 800px;
  height: 550px;
  border-radius: 5px;
  background-color: #ffffff;
}
.base-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #f8f9fa;
  height: 60px;
  padding: 0 15px;
  .logo-container {
    display: flex;
    align-items: center;
  }
}
.base-modal-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px;
}
.icon {
  margin: 4px;
}
.icon--large {
  font-size: $font-size-large;
}
</style>
