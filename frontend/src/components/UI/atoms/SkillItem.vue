<template>
  <div class="skill-item">
    <span class="skill-item__content" :class="{ readonly: $props.readonly }">
      {{ $props.skillInfo.name }}
    </span>
    <button
      v-if="!$props.readonly"
      class="skill-item__delete-btn"
      @click="$emit('delete-btn')"
    >
      x
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Skill } from '@/api/modules/skills/types';

export default defineComponent({
  name: 'SkillItem',
  props: {
    skillInfo: {
      type: Object as PropType<Skill>,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['delete-btn'],
});
</script>

<style lang="scss" scoped>
.skill-item {
  display: inline-block;
  font-size: $--font-size-small;
  padding: 4px 8px;
  margin: 5px 2px;
  background-color: $--color-primary-bright;
  color: $--color-primary;
  border-radius: 5px;

  &__content {
    margin-right: 5px;
  }

  .readonly {
    margin-right: 0;
  }

  &__delete-btn {
    cursor: pointer;
    font-size: $--font-size-small;
    font-weight: 700;
  }
}
</style>
