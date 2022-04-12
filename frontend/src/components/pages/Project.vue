<template>
  <base-layout>
    <template #header>
      <div class="condition-item-container">
        <skill-item :skill-info="{ id: 1, value: 'vue', name: 'Vue' }" />
        조건 초기화
      </div>
    </template>
    <template #main>
      <project-card
        v-for="(project, idx) in projectData"
        :key="idx"
        :title="project.title"
        :intro="project.intro"
        :skills="project.skills"
      />
    </template>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import SkillItem from '@/components/UI/atoms/SkillItem.vue';
import ProjectCard from '@/components/UI/atoms/ProjectCard.vue';
import { getProjectsAPI } from '@/api/modules/projects';
import { GetProjectsRes } from '@/api/modules/projects/types';

export default defineComponent({
  name: 'Project',
  components: { BaseLayout, SkillItem, ProjectCard },
  setup() {
    const projectData = ref<GetProjectsRes[]>();

    onMounted(async () => {
      try {
        const { data } = await getProjectsAPI({
          page: 1,
          size: 15,
          locations: [],
          skills: [],
        });
        if (data.success) {
          projectData.value = data.data;
        }
      } catch (error) {
        console.error(error);
      }
    });

    return {
      projectData,
    };
  },
});
</script>

<style scoped></style>
