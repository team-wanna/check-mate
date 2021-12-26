<template>
  <div class="skill-item">
    <span class="skill-item__skill-content">{{ $props.skillInfo.name }}</span>
    <button class="skill-item__delete-btn" @click="$emit('delete-btn')">
      x
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { skillColorMap } from '@/common/Utils';
import { SkillRes } from '@/api/modules/skills/types';

export default defineComponent({
  name: 'SkillItem',
  props: {
    skillInfo: {
      type: Object as PropType<SkillRes>,
      required: true,
    },
  },
  emits: ['delete-btn'],
  setup(props) {
    const skillBgColor: string = skillColorMap[props.skillInfo.value];

    return {
      skillBgColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.skill-item {
  display: inline-block;
  font-size: 15px;
  padding: 4px 8px;
  margin: 5px 2px;
  background-color: v-bind('skillBgColor');
  color: #ffffff;
  border-radius: 5px;
  &__skill-content {
    margin-right: 5px;
  }
  &__delete-btn {
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
