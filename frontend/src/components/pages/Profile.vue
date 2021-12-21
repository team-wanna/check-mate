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
              <img :src="profilePicture" />
            </div>
            <form method="post" enctype="multipart/form-data">
              <label class="profile-picture-label" for="picture">
                📷사진 바꾸기
              </label>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                @change="loadFile"
              />
            </form>
            <span class="btn-save" @click="clickProfileImageSaveBtn"
              >저장하기</span
            >
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
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import {
  EditProfileReq,
  editProfile,
  editProfileImage,
  getProfile,
  createUserSkill,
  GetProfileRes,
  deleteUserSkill,
} from '@/api/modules/user';
import useToast from '@/composables/toast';
import { getSkillsAPI, Skill } from '@/api/modules/skill';
import SkillItem from '@/components/UI/atoms/SkillItem.vue';

export default defineComponent({
  name: 'Profile',
  components: { SkillItem, BaseLayout },
  setup() {
    const store = useStore();
    const { triggerToast } = useToast();
    const profilePicture = ref(store.getters['user/getProfileImageUrl']);
    const profileData = new FormData();
    const profile = reactive<GetProfileRes>({
      name: '',
      intro: '',
      email: '',
      id: -1,
      createdAt: '',
      profileImageUrl: '',
      provider: '',
      subId: '',
      updatedAt: '',
      skills: [],
    });
    const skillInputRef = ref();
    const searchedSkillData = ref<Skill[]>([]);
    const currentSkill = ref<number>(-1);
    const registeredSkills = ref<Skill[]>([]);
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
          profile.skills.push(targetSkill);
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
        const targetSkill = profile.skills[idx];

        const { data } = await deleteUserSkill(targetSkill.value);
        if (data.success) {
          await triggerToast(
            `${targetSkill.name} 스킬이 삭제 되었습니다.`,
            'success',
          );
          profile.skills.splice(idx, 1);
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

    const loadFile = (event: any) => {
      const { target } = event;
      const file = target?.files[0];

      profileData.append('profileImageFile', file);
      profilePicture.value = URL.createObjectURL(file);
    };
    const clickProfileImageSaveBtn = async () => {
      try {
        const { data } = await editProfileImage(profileData);
        if (data.success) {
          store.commit('user/setProfileImageUrl', data.data[0].profileImageUrl);
          await triggerToast('프로필 이미지가 수정되었습니다😁', 'success');
        } else {
          await triggerToast('프로필 이미지 수정을 실패했습니다☹', 'danger');
        }
      } catch (error) {
        console.error(error);
        await triggerToast(error, 'danger');
      }
    };
    const clickBaseProfileSaveBtn = async () => {
      const data: EditProfileReq = {
        name: profile.name,
        intro: profile.intro,
      };
      try {
        await editProfile(data);
        await triggerToast('기본정보가 수정되었습니다😁', 'success');
      } catch (error) {
        console.error(error);
        await triggerToast('기본정보 수정을 실패했습니다☹', 'danger');
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

    onMounted(async () => {
      const { data } = await getProfile();
      const { name, intro, email, skills } = data.data[0];

      profile.name = name || '';
      profile.intro = intro || '';
      profile.email = email || '';
      profile.skills = skills || [];

      store.commit('user/setName', name);
      store.commit('user/setIntro', intro);
    });

    return {
      profilePicture,
      profile,
      skillInputRef,
      searchedSkillData,
      currentSkill,
      registeredSkills,
      loadFile,
      clickProfileImageSaveBtn,
      clickBaseProfileSaveBtn,
      searchSkill,
      selectSkill,
      deleteSkill,
      onMouseoverSkill,
      onFocusoutSkillInput,
      onKeydownSkillInput,
      onKeyupSkillInput,
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
      width: 200px;
      height: 200px;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100px;
      }
    }
    .profile-picture-label {
      font-size: $--font-size-medium;
      margin-left: 20px;
      padding: 10px 5px;
      cursor: pointer;
      border: 1px solid $--color-border;
      border-radius: 10px;
      transition: color, background-color ease-in 0.1s;
    }
    .profile-picture-label:hover {
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
  #picture {
    visibility: hidden;
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
