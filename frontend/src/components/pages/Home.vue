<template>
  <base-layout>
    <template #header>
      <div class="home-header">
        <div class="condition-area">
          <skill-search
            v-model:skills="skills"
            placeholder="📚기술스택"
            :width="300"
          />
          <div class="condition-area__location">
            <div
              class="condition-area__location-wrapper"
              :class="{
                'condition-area__location-wrapper--active': isLocationActive,
              }"
              @click="clickLocationBtn"
            >
              <span class="condition-area__location-title">🗺️지역</span>
              <fa :icon="['fas', 'angle-down']" />
            </div>
            <ul class="condition-area__location-list" v-show="isLocationActive">
              <li
                class="condition-area__location-list-item"
                v-for="location in locationList"
                :key="location"
              >
                <label class="location-label" :for="location">
                  <input
                    type="checkbox"
                    v-model="locations"
                    :id="location"
                    :name="location"
                    :value="location"
                  />
                  {{ location }}
                </label>
              </li>
            </ul>
          </div>
          <div
            class="condition-area__popularity"
            :class="{
              'condition-area__popularity--active': isSortByPopularity,
            }"
            @click="clickPopularityBtn"
          >
            🔥인기 프로젝트
          </div>
        </div>
        <div
          class="condition-items"
          v-show="skills.length || locations.length || isSortByPopularity"
        >
          <skill-item
            v-for="(skill, idx) in skills"
            :skill-info="skill"
            :key="skill.id"
            @delete-btn="deleteSkill(idx)"
          />
          <location-item
            v-for="(location, idx) in locations"
            :key="location"
            :location-info="location"
            @delete-btn="deleteLocation(idx)"
          />
          <popularity-item v-show="isSortByPopularity" />
          조건 초기화
        </div>
      </div>
    </template>
    <template #main>
      <div class="home-main">
        <project-card
          v-for="(project, idx) in projects"
          :key="idx"
          :title="project.title"
          :intro="project.intro"
          :skills="project.skills"
        />
      </div>
    </template>
  </base-layout>
  <sign-up-modal :visible="$props.isSignUp" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import SignUpModal from '@/components/pages/SignUpModal.vue';
import api from '@/api';
import useToast from '@/composables/toast';
import useLoadingMask from '@/composables/loadingMask';
import ProjectCard from '@/components/UI/atoms/ProjectCard.vue';
import SkillSearch from '@/components/UI/atoms/SkillSearch.vue';
import SkillItem from '@/components/UI/atoms/SkillItem.vue';
import { Skill } from '@/api/modules/skills/types';
import LocationItem from '@/components/UI/atoms/locationItem.vue';
import PopularityItem from '@/components/UI/atoms/PopularityItem.vue';
import { GetProjectsRes } from '@/api/modules/projects/types';
import { getProjectsAPI } from '@/api/modules/projects';

export default defineComponent({
  name: 'Home',
  components: {
    PopularityItem,
    LocationItem,
    ProjectCard,
    SignUpModal,
    SkillSearch,
    SkillItem,
    BaseLayout,
  },
  props: {
    isSignUp: {
      type: String,
      default: 'false',
    },
  },
  setup() {
    const store = useStore();
    const { triggerToast } = useToast();
    const { showLoadingMask, hideLoadingMask } = useLoadingMask();
    const token = window.sessionStorage.getItem('token');
    const isShowSignIn = ref(false);
    const skills = ref<Skill[]>([]);
    const isLocationActive = ref(false);
    const locations = ref<string[]>([]);
    const locationList: string[] = [
      '서울',
      '경기',
      '강원',
      '충북',
      '충남',
      '전북',
      '전남',
      '경북',
      '경남',
      '제주',
    ];
    const isSortByPopularity = ref(false);
    const projects = ref<GetProjectsRes[]>();

    const deleteSkill = (idx: number) => {
      skills.value.splice(idx, 1);
    };
    const deleteLocation = (idx: number) => {
      locations.value.splice(idx, 1);
    };
    const clickLocationBtn = () => {
      isLocationActive.value = !isLocationActive.value;
    };
    const clickPopularityBtn = () => {
      isSortByPopularity.value = !isSortByPopularity.value;
    };

    onMounted(async () => {
      try {
        await showLoadingMask();
        if (token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          api.apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
          await store.dispatch('user/fetchProfile');
          await triggerToast('로그인 되었습니다.', 'success');
        }
        const { data } = await getProjectsAPI({
          page: 1,
          size: 15,
          locations: [],
          skills: [],
        });
        if (data.success) {
          projects.value = data.data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        await hideLoadingMask();
      }
    });

    return {
      skills,
      locations,
      locationList,
      isShowSignIn,
      isLocationActive,
      isSortByPopularity,
      projects,
      clickLocationBtn,
      clickPopularityBtn,
      deleteSkill,
      deleteLocation,
    };
  },
});
</script>
<style lang="scss">
.home-header {
  .condition-area {
    display: flex;
    align-items: center;
    font-size: $--font-size-medium;
    margin-bottom: 24px;

    .skill-search {
      margin-right: 10px;
    }

    &__location {
      &-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        width: 120px;
        height: 40px;
        margin-right: 10px;
        cursor: pointer;
        border: 1px solid $--color-border;
        border-radius: 5px;

        &:hover {
          border-color: $--color-primary;
        }

        &--active {
          border-color: $--color-primary;
          background-color: $--color-primary;
          color: #ffffff;
        }
      }

      &-title {
        margin: 0 8px;
      }

      &-list {
        position: absolute;
        width: 104px;
        padding: 10px 8px;
        border: 1px solid $--color-border;
        background-color: #ffffff;

        &-item {
          .location-label {
            padding: 0 15px;
            cursor: pointer;

            input {
              margin-right: 10px;
            }

            &:hover {
              color: #347d39;
              border-color: #347d39;
            }
          }
        }
      }
    }

    &__popularity {
      display: flex;
      align-items: center;
      width: 170px;
      height: 40px;
      cursor: pointer;
      border: 1px solid $--color-border;
      border-radius: 5px;
      padding-left: 8px;

      &--active {
        border-color: $--color-primary;
        background-color: $--color-primary;
        color: #ffffff;
      }

      &:hover {
        border: 1px solid $--color-primary;
      }
    }
  }
}

.home-main {
  display: grid;
  grid: repeat(3, 1fr) / auto-flow;
  row-gap: 25px;
}
</style>
