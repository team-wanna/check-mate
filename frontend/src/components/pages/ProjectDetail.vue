<template>
  <base-layout>
    <template #header>
      <div class="header-wrapper">
        <div>
          <h1 class="header-wrapper__title">Lorem Ipsum</h1>
        </div>
      </div>
    </template>
    <template #main>
      <div class="main-wrapper">
        <div class="section">
          <h2 class="section__title">상세 소개</h2>
          <p class="section__content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div class="section">
          <h2 class="section__title">기술 스택</h2>
          <skill-item
            v-for="skill in skills"
            :skill-info="skill"
            :key="skill.id"
            :readonly="true"
          />
        </div>
      </div>
      <aside class="side-wrapper">
        <div class="summary">
          <h2 class="summary__title">요약</h2>
          <table class="summary__content">
            <tr class="row">
              <td class="label">
                <div class="icon">
                  <fa :icon="['fas', 'comment-dots']" />
                </div>
                한 줄 소개
              </td>
              <td class="content">소개 내용</td>
            </tr>
            <tr class="row">
              <td class="label">
                <div class="icon">
                  <fa :icon="['fas', 'child']" />
                </div>
                인원
              </td>
              <td class="content">5명</td>
            </tr>
            <tr class="row">
              <td class="label">
                <div class="icon">
                  <fa :icon="['fas', 'calendar-check']" />
                </div>
                기간
              </td>
              <td class="content">3개월</td>
            </tr>
            <tr class="row">
              <td class="label">
                <div class="icon">
                  <fa :icon="['fas', 'location-arrow']" />
                </div>
                위치
              </td>
              <td class="content">서울, 온라인</td>
            </tr>
          </table>
        </div>
        <div class="request-wrapper">
          <div class="apply">
            <span class="apply-icon">
              <fa :icon="['fas', 'rocket']" />
            </span>
            <h2 class="apply-content">지원하기</h2>
          </div>
          <div class="star">
            <span
              class="star-icon"
              :class="{ 'star-icon--active': isStar }"
              @click="onClickFavorite"
            >
              <fa :icon="[isStar ? 'fas' : 'far', 'star']" />
            </span>
          </div>
        </div>
      </aside>
    </template>
  </base-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import SkillItem from '@/components/UI/atoms/SkillItem.vue';
import { Skill } from '@/api/modules/skills/types';
import useToast from '@/composables/toast';

export default {
  name: 'ProjectDetail',
  components: { BaseLayout, SkillItem },
  setup() {
    const { triggerToast } = useToast();
    const isStar = ref(false);
    const skills = ref<Skill[]>([
      { id: 1, value: 'javascript', name: 'JavaScript' },
      { id: 2, value: 'typescript', name: 'TypeScript' },
      { id: 3, value: 'java', name: 'Java' },
    ]);
    const onClickFavorite = () => {
      isStar.value = !isStar.value;

      if (isStar.value) {
        // TODO API
        triggerToast('즐겨찾기에 추가했습니다.', 'success');
      } else {
        // TODO API
        triggerToast('즐겨찾기를 취소했습니다.', 'success');
      }
    };

    return {
      isStar,
      skills,
      onClickFavorite,
    };
  },
};
</script>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  justify-content: space-between;
  font-size: $--font-size-large;
  padding: 0 10px 20px 10px;
  border-bottom: 1px $--color-border solid;

  &-right {
    display: flex;
    align-items: center;
  }

  &__title {
    line-height: 58px;
  }
}

.main-wrapper {
  width: 35vw;

  .section {
    width: 100%;
    margin-top: 40px;
    padding: 0 10px;

    &__title {
      font-size: $--font-size-medium;
      padding-bottom: 10px;
    }

    &__content {
      font-size: $--font-size-small;
    }
  }
}

.side-wrapper {
  position: fixed;
  width: 20vw;
  top: 32vh;
  right: 20vw;
  padding: 20px;
  border: 1px solid $--color-border;
  font-size: $--font-size-small;

  .summary {
    &__title {
      font-size: $--font-size-medium;
      padding-bottom: 10px;
    }

    &__content {
      width: 100%;

      .row {
        height: 35px;
        font-size: $--font-size-small;
        line-height: 35px;
        border-top: 1px solid $--color-border;

        .label {
          width: 30%;
        }

        .content {
          width: 70%;
          padding-left: 15px;
        }

        .icon {
          display: inline-block;
          width: 20px;
          text-align: center;
        }
      }
    }
  }

  .request-wrapper {
    display: flex;
    align-items: center;
    margin-top: 15px;

    .apply {
      display: flex;
      width: 60%;
      padding: 10px 15px;
      margin-right: 10px;
      border-radius: 20px;
      font-size: 22px;
      background-color: #25f8ccff;
      transition: 0.2s ease-in-out background-color;

      &:hover {
        cursor: pointer;
        background-color: #0adeb5;
      }

      &-icon {
        margin-right: 10px;
      }
    }

    .star {
      position: absolute;
      right: 34%;

      &-icon {
        font-size: $--font-size-medium;
        cursor: pointer;
        color: #ffb500;
        border-radius: 30px;
        padding: 10px;
        transition: 0.3s ease-in-out background-color;

        &:hover {
          background-color: rgba(82, 82, 82, 0.1);
          border-radius: 30px;
        }
      }
    }
  }
}
</style>
