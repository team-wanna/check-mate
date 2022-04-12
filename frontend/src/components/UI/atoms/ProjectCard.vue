<template>
  <div class="project-card">
    <div class="project-card__container">
      <div class="project-card__header">
        <img
          class="project-icon"
          src="@/assets/project-default-image.png"
          alt="project icon"
        />
        <p>{{ $props.title }}</p>
      </div>
      <div class="project-card__intro">{{ $props.intro }}</div>
      <div class="project-card__skill">
        <skill-item
          v-for="(skill, idx) in $props.skills"
          :key="idx"
          :skill-info="skill"
          :readonly="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SkillItem from '@/components/UI/atoms/SkillItem.vue';
import { Skill } from '@/api/modules/skills/types';

export default defineComponent({
  name: 'ProjectCard',
  components: { SkillItem },
  props: {
    title: {
      type: String,
      default: 'Project Title',
    },
    intro: {
      type: String,
      default: 'Project Intro',
    },
    skills: {
      type: Object as PropType<Skill[]>,
    },
  },
});
</script>

<style lang="scss" scoped>
.project-card {
  display: inline-block;
  width: calc(30%);
  min-width: 288px;
  background-size: cover;
  background-color: #ffffff;
  border-radius: 14px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
  box-shadow: 0 5px 15px rgb(0 0 0 / 15%);
  transition: 0.3s ease;

  &__header {
    display: flex;
    align-items: center;
  }
}

.project-card:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 15px rgb(145 71 255 / 80%);
}

.project-card__container {
  display: flex;
  min-height: 170px;
  flex-direction: column;
  width: calc(100% - 40px);
  padding: 20px;
  font-size: 16px;
  border-radius: 14px;
  cursor: pointer;
}

.project-card__intro {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6em;
  margin-top: 20px;
  margin-left: 5px;
  border-bottom: 1px solid $--color-border;
  padding-bottom: 20px;
}

.project-card__skill {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.project-icon {
  width: 20%;
  min-width: 30px;
  margin-right: 10px;
}
</style>
