<template>
  <base-layout>
    <template #header>
      <p class="profile-header">내 정보</p>
    </template>
    <template #main>
      <div class="profile-container">
        <section class="profile-container__content">
          <p class="profile-item--title">프로필</p>
          <div class="profile-item-box profile-item--picture">
            <div class="profile-picture">
              <img :src="profile.profileImageUrl" alt="Profile Image" />
            </div>
            <button
              class="change-profile-btn"
              @click="clickProfileIconChangeBtn"
            >
              📷 사진 변경하기
            </button>
            <span class="btn-save" @click="clickProfileImageSaveBtn">
              저장하기
            </span>
          </div>
        </section>
        <section class="profile-container__content">
          <p class="profile-item--title">기본정보</p>
          <div class="profile-item-box profile-item--info">
            <div class="info-item-box">
              <label class="info-title">📛이름</label>
              <input type="text" v-model="profile.name" class="info-content" />
            </div>
            <div class="info-item-box">
              <label class="info-title">🤗소개</label>
              <textarea
                class="info-content info-content--intro"
                placeholder="나를 소개해봐요!"
                v-model="profile.intro"
              >
              </textarea>
            </div>
            <span class="btn-save" @click="clickBaseProfileSaveBtn">
              저장하기
            </span>
          </div>
        </section>
        <section class="profile-container__content">
          <p class="profile-item--title">추가정보</p>

          <div class="profile-item-box profile-item--info">
            <div class="info-item-box">
              <label class="info-title">📧이메일</label>
              <input type="text" :value="profile.email" class="info-content" />
            </div>

            <div class="info-item-box">
              <label class="info-title">📚기술스택</label>
              <input
                type="search"
                placeholder="기술스택을 검색하세요!"
                class="info-content"
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

              <skill-item
                v-for="(skill, idx) in profile.skills"
                :key="skill.id"
                :skill-info="skill"
                @delete-btn="deleteSkill(idx)"
              />
            </div>
          </div>
        </section>
        <section class="profile-container__content">
          <p class="profile-item--title">나의 팀</p>
          <div class="profile-item-box profile-item--info">
            <div class="info-item-box">
              <p class="is-empty">소속된 팀이 없어요😥</p>
            </div>
          </div>
        </section>
        <section class="profile-container__content">
          <p class="profile-item--title">관심목록</p>
          <div class="profile-item-box profile-item--info">
            <div class="info-item-box">
              <p class="is-empty">관심있는 프로젝트를 즐겨찾기 해보세요⭐</p>
            </div>
          </div>
        </section>
      </div>
    </template>
  </base-layout>
  <profile-icon-modal
    v-model:visible="showProfileIconModal"
    @change-default-icon="changeDefaultIcon"
    :default-profile-icon="defaultProfileIcon"
    @upload-custom-icon="uploadCustomIcon"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import _ from 'lodash';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import {
  editProfileAPI,
  editProfileImageAPI,
  getUserProfileAPI,
  createUserSkill,
  deleteUserSkill,
  editDefaultProfileImageAPI,
} from '@/api/modules/users';
import useToast from '@/composables/toast';
import { getSkillsAPI } from '@/api/modules/skills';
import SkillItem from '@/components/UI/atoms/SkillItem.vue';
import { EditProfile } from '@/api/modules/users/types';
import { Skill } from '@/api/modules/skills/types';
import api from '@/api';
import ProfileIconModal from '@/components/pages/ProfileIconModal.vue';
import useLoadingMask from '@/composables/loadingMask';

export default defineComponent({
  name: 'Profile',
  components: { ProfileIconModal, SkillItem, BaseLayout },
  setup() {
    // TODO - 새로고침시 토큰 유지를 위해 임시로 token 넣음. 추후 공통함수로 묶어야함.
    const token = window.sessionStorage.getItem('token');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    api.apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    const store = useStore();
    const { triggerToast } = useToast();
    const { showLoadingMask, hideLoadingMask } = useLoadingMask();
    const profileData = new FormData();
    const profile = ref(_.cloneDeep(store.getters['user/getProfile']));
    const profileImage = ref(profile.value.profileImageUrl);
    const skillInputRef = ref();
    const searchedSkillData = ref<Skill[]>([]);
    const currentSkill = ref<number>(-1);
    const registeredSkills = ref<Skill[]>([]);
    const showProfileIconModal = ref(false);
    const profileFileName = store.getters[
      'user/getProfile'
    ].profileImageUrl.split('https://check-mate.s3.amazonaws.com/users/')[1];
    const defaultProfileIcon = ref(
      // eslint-disable-next-line no-restricted-globals
      isNaN(+profileFileName) ? -1 : +profileFileName[0],
    );
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
                name: '검색 결과가 없습니다. 영어로 검색해 주세요!',
                value: 'noSkillData',
              },
            ];
        currentSkill.value = 0;
      }, 300);
    };
    const selectSkill = async () => {
      try {
        const targetSkill = searchedSkillData.value[currentSkill.value];

        if (targetSkill.id === -1) {
          return;
        }
        const { data } = await createUserSkill(targetSkill.value);
        if (data.success) {
          await triggerToast(
            `${targetSkill.name} 스킬이 등록 되었습니다.`,
            'success',
          );
          profile.value.skills.push(targetSkill);
        } else {
          await triggerToast(
            `${targetSkill.name} 스킬 등록을 실패했습니다.`,
            'danger',
          );
        }
      } catch (error) {
        console.error(error);
        await triggerToast(error, 'danger');
      } finally {
        searchedSkillData.value = [];
        skillInputRef.value.value = '';
        skillInputRef.value.blur();
      }
    };
    const deleteSkill = async (idx: number) => {
      try {
        const targetSkill = profile.value.skills[idx];

        const { data } = await deleteUserSkill(targetSkill.value);
        if (data.success) {
          await triggerToast(
            `${targetSkill.name} 스킬이 삭제 되었습니다.`,
            'success',
          );
          profile.value.skills.splice(idx, 1);
        } else {
          await triggerToast(
            `${targetSkill.name} 스킬 삭제를 실패했습니다.`,
            'danger',
          );
        }
      } catch (error) {
        console.error(error);
        await triggerToast(error, 'danger');
      }
    };

    const editProfileImage = async (
      defaultProfileImage: number,
      fromData: FormData,
    ) => {
      const { data } =
        defaultProfileImage === -1
          ? await editProfileImageAPI(fromData)
          : await editDefaultProfileImageAPI(defaultProfileImage);
      if (data.success) {
        await store.dispatch('user/fetchProfile');
        await triggerToast('프로필 이미지가 수정되었습니다😁', 'success');
      } else {
        await triggerToast('프로필 이미지 수정을 실패했습니다☹', 'danger');
      }
    };
    const clickProfileImageSaveBtn = async () => {
      try {
        await showLoadingMask();
        await editProfileImage(defaultProfileIcon.value, profileData);
      } catch (error) {
        console.error(error);
        await triggerToast(error, 'danger');
      } finally {
        await hideLoadingMask();
      }
    };
    const clickBaseProfileSaveBtn = async () => {
      const data: Partial<EditProfile> = {
        name: profile.value.name,
        intro: profile.value.intro,
      };

      try {
        await showLoadingMask();
        await editProfileAPI(data);
        await triggerToast('기본정보가 수정되었습니다😁', 'success');
      } catch (error) {
        console.error(error);
        await triggerToast('기본정보 수정을 실패했습니다☹', 'danger');
      } finally {
        await hideLoadingMask();
      }
    };

    const onMouseoverSkill = (idx: number) => {
      currentSkill.value = idx;
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
    const clickProfileIconChangeBtn = () => {
      showProfileIconModal.value = true;
    };
    const changeDefaultIcon = (profileNumber: number) => {
      defaultProfileIcon.value = profileNumber;

      if (profileNumber !== -1) {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        profile.value.profileImageUrl = require(`@/assets/profile/${profileNumber}.png`);
      }
    };
    const uploadCustomIcon = (profileFile: any) => {
      profileData.delete('profileImageFile');
      profileData.append('profileImageFile', profileFile);
      profile.value.profileImageUrl = URL.createObjectURL(profileFile);
    };

    onMounted(async () => {
      const { data } = await getUserProfileAPI();
      const { name, intro, email, skills } = data.data[0];

      profile.value.name = name || '';
      profile.value.intro = intro || '';
      profile.value.email = email || '';
      profile.value.skills = skills || [];

      store.commit('user/setName', name);
      store.commit('user/setIntro', intro);
    });

    return {
      profile,
      profileImage,
      skillInputRef,
      searchedSkillData,
      currentSkill,
      registeredSkills,
      showProfileIconModal,
      defaultProfileIcon,
      clickProfileImageSaveBtn,
      clickBaseProfileSaveBtn,
      searchSkill,
      selectSkill,
      deleteSkill,
      onMouseoverSkill,
      onFocusoutSkillInput,
      onKeydownSkillInput,
      onKeyupSkillInput,
      clickProfileIconChangeBtn,
      changeDefaultIcon,
      uploadCustomIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-header {
  margin: 30px 0;
  padding-bottom: 10px;
  font-size: $--font-size-large;
  border-bottom: 2px solid $--color-border;
}

.profile-container {
  &__content {
    display: flex;
    margin-bottom: 30px;
  }

  .profile-item--title {
    width: calc(15% - 20px);
    margin: 10px;
    font-size: $--font-size-medium;
  }

  .profile-item-box {
    width: calc(90% - 60px);
    padding: 30px;
    border: 1px solid $--color-border;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgb(0 0 0 / 15%);
  }

  .profile-item--picture {
    .profile-picture {
      position: relative;
      width: 200px;
      height: 200px;
      margin-bottom: 30px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 100px;
      }
    }

    .change-profile-btn {
      font-size: $--font-size-medium;
      margin-left: 20px;
      padding: 10px 5px;
      cursor: pointer;
      border: 1px solid $--color-border;
      border-radius: 10px;
      transition: color, background-color ease-in 0.1s;
    }

    .change-profile-btn:hover {
      color: #ffffff;
      border-color: $--color-primary;
      background-color: $--color-primary;
    }
  }

  .profile-item--info {
    .info-item-box {
      padding: 20px;

      .info-title {
        display: block;
        font-size: $--font-size-medium;
        margin-bottom: 10px;
      }

      .info-content {
        display: block;
        width: 440px;
        min-height: 40px;
        padding-left: 8px;
        border: 2px solid $--color-border;
        border-radius: 5px;
        box-sizing: content-box;
        font-family: BMHANNAPro, serif;
        font-size: $--font-size-small;

        &:focus {
          border-color: $--color-primary;
          box-shadow: 0 0 0 1px $--color-primary;
          outline: none;
        }
      }

      .info-content--intro {
        height: 100px;
        padding: 8px;
      }
    }
  }
}

.btn-save {
  float: right;
  font-size: $--font-size-medium;
  color: #ffffff;
  padding: 5px 16px;
  background-color: $--color-success-dark;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color ease-in 0.1s;
}

.btn-save:hover {
  background-color: $--color-success;
}

.is-empty {
  font-size: $--font-size-small;
}

.skill-list {
  position: absolute;
  width: 448px;
  max-height: 200px;
  overflow-y: auto;
  border: 2px solid $--color-border;
  border-radius: 5px;
  box-sizing: content-box;

  &__content {
    margin: 1px;
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
