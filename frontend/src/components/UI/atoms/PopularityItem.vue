<template>
  <div class="popularity-item">
    <span class="popularity-item__content">인기순</span>
    <button class="popularity-item__delete-btn" @click="$emit('delete-btn')">
      x
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PopularityItem',
  emits: ['delete-btn'],
});
</script>

<style lang="scss" scoped>
.popularity-item {
  display: inline-block;
  font-size: $--font-size-small;
  padding: 4px 8px;
  margin: 5px 2px;
  background-color: #ffc8ee;
  color: #ff47a9;
  border-radius: 5px;

  &__content {
    margin-right: 5px;
  }

  &__delete-btn {
    cursor: pointer;
    font-size: $--font-size-small;
    font-weight: 700;
  }
}
</style>
