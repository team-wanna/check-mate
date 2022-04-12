<template>
  <div class="location-item">
    <span class="location-item__content">
      {{ $props.locationInfo }}
    </span>
    <button class="location-item__delete-btn" @click="$emit('delete-btn')">
      x
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'locationItem',
  props: {
    locationInfo: {
      type: String,
      required: true,
    },
  },
  emits: ['delete-btn'],
});
</script>

<style lang="scss" scoped>
.location-item {
  display: inline-block;
  font-size: $--font-size-small;
  padding: 4px 8px;
  margin: 5px 2px;
  background-color: #c8f5ff;
  color: #47b2ff;
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
