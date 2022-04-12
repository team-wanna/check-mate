<template>
  <input
    type="text"
    :placeholder="$props.placeholder"
    class="skill-search"
    @input="searchSkill"
    @focusout="onFocusoutSkillInput"
    @keydown.down.prevent="onKeydownSkillInput"
    @keydown.up.prevent="onKeyupSkillInput"
    @keydown.enter="selectSkill"
    ref="skillInputRef"
  />
  <ul v-if="searchedSkillData.length" class="skill-list">
    <li
      v-for="(skillData, idx) in searchedSkillData"
      :key="idx"
      class="skill-list__content"
      @mouseover="onMouseoverSkill(idx)"
      @mousedown="selectSkill"
      :class="{
        'skill-list__content--focus': currentSkill === idx,
      }"
    >
      {{ skillData.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { getSkillsAPI } from '@/api/modules/skills';
import { Skill } from '@/api/modules/skills/types';

export default defineComponent({
  name: 'SkillSearch',
  props: {
    placeholder: {
      type: String,
      default: '기술스택을 검색하세요!',
    },
    width: {
      type: Number,
      default: 300,
    },
    skills: {
      type: Array as PropType<Skill[]>,
      required: true,
    },
  },
  emits: ['update:skills'],
  setup(props, { emit }) {
    const currentSkill = ref<number>(-1);
    const searchedSkillData = ref<Skill[]>([]);
    const skillInputRef = ref();
    const skills = computed({
      get: () => props.skills,
      set: (newValue) => emit('update:skills', [...props.skills, ...newValue]),
    });
    let searchSkillTimeout = -1;

    const searchSkill = (event: any) => {
      clearTimeout(searchSkillTimeout);
      searchSkillTimeout = setTimeout(async () => {
        const { data } = await getSkillsAPI(event.target.value);

        searchedSkillData.value = data.data.length
          ? data.data
          : [
              {
                id: -1,
                name: '검색 결과가 없습니다.',
                value: 'noSkillData',
              },
            ];
        currentSkill.value = 0;
      }, 300);
    };
    const selectSkill = async () => {
      const targetSkill = searchedSkillData.value[currentSkill.value];
      if (targetSkill.id === -1) {
        return;
      }
      skills.value = [targetSkill];
      searchedSkillData.value = [];
      skillInputRef.value.value = '';
      // try {
      //   const targetSkill = searchedSkillData.value[currentSkill.value];
      //
      //   if (targetSkill.id === -1) {
      //     return;
      //   }
      //   const { data } = await createUserSkill(targetSkill.value);
      //   if (data.success) {
      //     await triggerToast(
      //       `${targetSkill.name} 스킬이 등록 되었습니다.`,
      //       'success',
      //     );
      //     skills.value = [targetSkill];
      //   } else {
      //     await triggerToast(
      //       `${targetSkill.name} 스킬 등록을 실패했습니다.`,
      //       'danger',
      //     );
      //   }
      // } catch (error) {
      //   console.error(error);
      //   await triggerToast(error, 'danger');
      // } finally {
      //   searchedSkillData.value = [];
      //   skillInputRef.value.value = '';
      //   skillInputRef.value.blur();
      // }
    };
    const onFocusoutSkillInput = () => {
      searchedSkillData.value = [];
    };
    const onKeydownSkillInput = () => {
      currentSkill.value += 1;
      currentSkill.value %= searchedSkillData.value.length;
    };
    const onKeyupSkillInput = () => {
      currentSkill.value -= 1;
      if (currentSkill.value < 0) {
        currentSkill.value = searchedSkillData.value.length - 1;
      }
    };
    const onMouseoverSkill = (idx: number) => {
      currentSkill.value = idx;
    };

    return {
      currentSkill,
      searchedSkillData,
      skillInputRef,
      skillSearchWidth: `${props.width}px`,
      skillListWidth: `${props.width + 8}px`,
      searchSkill,
      selectSkill,
      onFocusoutSkillInput,
      onKeydownSkillInput,
      onKeyupSkillInput,
      onMouseoverSkill,
    };
  },
});
</script>

<style scoped lang="scss">
.skill-search {
  display: block;
  width: v-bind(skillSearchWidth);
  min-height: 40px;
  padding-left: 8px;
  border: 1px solid $--color-border;
  border-radius: 5px;
  box-sizing: content-box;
  font-family: BMHANNAPro, serif;
  font-size: $--font-size-medium;

  &:hover,
  &:focus {
    border-color: $--color-primary;
    outline: none;
  }

  &::placeholder {
    color: #b1b1b7ff;
  }
}

.skill-list {
  position: absolute;
  top: 240px;
  width: v-bind(skillListWidth);
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid $--color-border;
  border-radius: 5px;
  box-sizing: content-box;
  font-size: $--font-size-small;

  &__content {
    height: 40px;
    padding-left: 8px;
    line-height: 40px;
    background-color: #ffffff;

    &--focus {
      background-color: $--color-primary;
    }
  }
}
</style>
