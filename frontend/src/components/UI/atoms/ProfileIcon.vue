<template>
  <div class="profile-icon-wrapper">
    <fa
      v-if="$props.isSelected"
      class="profile-icon-check"
      :icon="['fas', 'check-circle']"
    />
    <img
      class="profile-icon"
      :src="require(`@/assets/profile/${$props.iconIdx}.png`)"
      alt="Profile Image"
      @click="$emit('select-icon', $props.iconIdx)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileIcon',
  props: {
    iconIdx: {
      required: true,
      type: Number,
    },
    isSelected: {
      required: true,
      type: Boolean,
    },
  },
  emits: ['select-icon'],
});
</script>

<style lang="scss" scoped>
.profile-icon-wrapper {
  position: relative;
}

.profile-icon-check {
  position: absolute;
  color: #46954a;
  font-size: 28px;
  top: 0;
  right: 0;
}

.profile-icon {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
</style>
