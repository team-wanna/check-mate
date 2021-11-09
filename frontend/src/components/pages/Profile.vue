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
              <input type="text" v-model="nameValue" class="info-content" />
            </div>
            <div class="info-item-box">
              <label class="info-title">🤗소개</label>
              <textarea
                class="info-content info-content--intro"
                placeholder="나를 소개해봐요!"
                v-model="introValue"
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
              <input
                type="text"
                value="devwani93@gmail.com"
                class="info-content"
              />
            </div>

            <div class="info-item-box">
              <label class="info-title">📚기술스택</label>
              <input
                type="search"
                placeholder="기술스택을 검색하세요!"
                class="info-content"
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
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import BaseLayout from '@/components/templates/BaseLayout.vue';
import {
  EditProfileReq,
  editProfile,
  editProfileImage,
  getProfile,
} from '@/api/modules/user';
import useToast from '@/composables/toast';

export default defineComponent({
  name: 'Profile',
  components: { BaseLayout },
  setup() {
    const store = useStore();
    const { triggerToast } = useToast();
    const profilePicture = ref(store.getters['user/getProfileImageUrl']);
    const profileData = new FormData();
    const nameValue = ref<string | undefined>('');
    const introValue = ref<string | undefined>('');

    const loadFile = (event: any) => {
      const { target } = event;
      const file = target?.files[0];
      profileData.append('profileImageFile', file);
      profilePicture.value = URL.createObjectURL(file);
    };
    const clickProfileImageSaveBtn = async () => {
      try {
        await editProfileImage(profileData);
        await triggerToast('프로필 이미지가 수정되었습니다😁', 'success');
      } catch (error) {
        console.error(error);
        await triggerToast('프로필 이미지 수정을 실패했습니다☹', 'danger');
      }
    };
    const clickBaseProfileSaveBtn = async () => {
      const data: EditProfileReq = {
        name: nameValue.value,
        intro: introValue.value,
      };
      try {
        await editProfile(data);
        await triggerToast('기본정보가 수정되었습니다😁', 'success');
      } catch (error) {
        console.error(error);
        await triggerToast('기본정보 수정을 실패했습니다☹', 'danger');
      }
    };

    onMounted(async () => {
      const { data } = await getProfile();
      const { name, intro } = data.data[0];

      nameValue.value = name;
      introValue.value = intro;

      store.commit('user/setName', name);
      store.commit('user/setIntro', intro);
    });

    return {
      profilePicture,
      nameValue,
      introValue,
      loadFile,
      clickProfileImageSaveBtn,
      clickBaseProfileSaveBtn,
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
      display: flex;
      flex-direction: column;
      padding: 20px;
      .info-title {
        font-size: $--font-size-medium;
        margin-bottom: 10px;
      }
      .info-content {
        width: 440px;
        height: 40px;
        padding-left: 8px;
        border: 2px solid $--color-border;
        border-radius: 5px;
        font-family: BMHANNAPro, serif;
        font-size: $--font-size-small;
      }
      .info-content:focus {
        border-color: $--color-primary;
        box-shadow: 0 0 0 1px $--color-primary;
        outline: none;
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
</style>
