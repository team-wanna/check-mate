<template>
  <base-modal v-model:visible="isShow">
    <template #main>
      <div class="profile-icon-modal">
        <div class="default-profile-icon-wrapper">
          <div class="profile-icon-box-title">
            <h2>기본 프로필 아이콘</h2>
          </div>
          <div class="profile-icon-content">
            <div class="profile-icon-box">
              <profile-icon
                v-for="idx in 9"
                :icon-idx="idx"
                :is-selected="idx === $props.defaultProfileIcon"
                :key="idx"
                @select-icon="selectDefaultIcon(idx)"
              />
            </div>
          </div>
        </div>
        <div class="custom-profile-icon-wrapper">
          <div class="profile-icon-box-title">
            <h2>나만의 프로필 아이콘</h2>
          </div>
          <div class="profile-icon-box-content"></div>
          <div class="profile-icon-box">
            <div
              class="file-upload-wrapper"
              :class="{ highlight: isHighlight }"
              @dragover.prevent.stop="isHighlight = true"
              @dragleave.prevent.stop="isHighlight = false"
              @drop.prevent.stop="uploadFile"
            >
              <fa
                class="file-upload"
                :class="{ highlight: isHighlight }"
                :icon="['fas', 'file-upload']"
              />
              <p
                class="file-upload-caption"
                :class="{ highlight: isHighlight }"
              >
                이미지 파일을 올려주세요
              </p>
            </div>
            <form
              method="post"
              enctype="multipart/form-data"
              class="file-upload-form"
            >
              <label class="file-upload-btn" for="profile-icon">
                <fa :icon="['fas', 'upload']" />
                이미지 파일 업로드하기
              </label>
              <input
                type="file"
                id="profile-icon"
                name="profile-icon"
                accept="image/*"
                @change="loadFile"
              />
            </form>
          </div>
        </div>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BaseModal from '../templates/BaseModal.vue';
import ProfileIcon from '@/components/UI/atoms/ProfileIcon.vue';

export default defineComponent({
  name: 'ProfileIconModal',
  components: { BaseModal, ProfileIcon },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    defaultProfileIcon: {
      type: Number,
      default: -1,
    },
  },
  emits: ['update:visible', 'change-default-icon', 'upload-custom-icon'],
  setup(props, { emit }) {
    const isShow = computed({
      get: () => props.visible,
      set: (newVal) => emit('update:visible', newVal),
    });
    const isHighlight = ref(false);

    const selectDefaultIcon = (idx: number) => {
      emit('change-default-icon', idx);
      isHighlight.value = false;
      isShow.value = false;
    };

    const uploadFile = (event: any) => {
      const { dataTransfer } = event;
      const file = dataTransfer?.files[0];

      emit('change-default-icon', -1);
      emit('upload-custom-icon', file);
      isHighlight.value = false;
      isShow.value = false;
    };

    const loadFile = (event: any) => {
      const { target } = event;
      const file = target?.files[0];

      emit('change-default-icon', -1);
      emit('upload-custom-icon', file);
      isHighlight.value = false;
      isShow.value = false;
    };

    return {
      isShow,
      isHighlight,
      selectDefaultIcon,
      uploadFile,
      loadFile,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-icon-modal {
  width: 100%;
  height: calc(100% - #{$--modal-header-height});
  display: flex;
}

.default-profile-icon-wrapper {
  width: 50%;
  height: 100%;
  border-right: 5px solid #f8f9fa;

  .profile-icon-box-title {
    margin-top: 20px;
    font-size: 30px;
    text-align: center;
  }

  .profile-icon-content {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .profile-icon-box {
      position: relative;
      display: grid;
      align-items: center;
      justify-items: center;
      grid: repeat(3, 100px) / auto-flow 100px;
    }
  }
}

.custom-profile-icon-wrapper {
  width: 50%;
  height: 100%;

  .profile-icon-box-title {
    margin-top: 20px;
    font-size: 30px;
    text-align: center;
  }

  .profile-icon-box {
    width: 80%;
    margin: 0 auto;

    .file-upload-wrapper {
      margin: 20px 0 30px;
      height: 300px;
      border: 2px dashed #c7c7ce;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.highlight {
        border: 2px dashed $--color-success;
      }

      .file-upload {
        font-size: $--font-size-large;
        color: #c7c7ceff;
        margin-bottom: 10px;

        &.highlight {
          color: $--color-success;
        }

        &-caption {
          font-size: $--font-size-medium;
          color: #c7c7ceff;

          &.highlight {
            color: $--color-success;
          }
        }
      }
    }

    .file-upload-form {
      text-align: center;
    }

    .file-upload-btn {
      font-size: $--font-size-medium;
      color: #ffffff;
      padding: 5px 16px;
      background-color: $--color-success-dark;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color ease-in 0.1s;

      &:hover {
        background-color: $--color-success;
      }
    }

    #profile-icon {
      visibility: hidden;
    }
  }
}
</style>
