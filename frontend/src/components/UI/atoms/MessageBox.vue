<template>
  <teleport to="body">
    <div class="message-box-modal" />
    <div class="message-box-wrapper">
      <div class="message-box">
        <div class="message-box__header"></div>
        <div class="message-box__content">{{ $props.message }}</div>
        <div class="message-box__btns">
          <button class="btn btn--cancel" @click="$emit('click-cancel')">
            Cancel
          </button>
          <button class="btn btn--ok" @click="$emit('click-ok')">OK</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageBox',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  emits: ['click-cancel', 'click-ok'],
});
</script>

<style scoped lang="scss">
.message-box-wrapper {
  z-index: 120;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;

  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
}

.message-box-modal {
  z-index: 110;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: #000000;
}

.message-box {
  display: inline-block;
  width: 420px;
  padding-bottom: 10px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;

  &__header {
    text-align: right;
    padding: 15px 15px 10px;
  }

  &__content {
    padding: 10px 15px;
    color: #606266;
    font-size: $--font-size-small;
  }

  &__btns {
    padding: 5px 15px 0;
    text-align: right;
  }
}

.btn {
  &--cancel {
    font-size: 16px;
    color: #606266;
    margin-right: 5px;
    padding: 9px 15px;
    border: 1px solid #606266;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color ease-in 0.1s;

    &:hover {
      background-color: #f4f4f4;
    }
  }

  &--ok {
    font-size: 16px;
    color: #ffffff;
    padding: 9px 15px;
    background-color: $--color-success-dark;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color ease-in 0.1s;

    &:hover {
      background-color: $--color-success;
    }
  }
}
</style>
