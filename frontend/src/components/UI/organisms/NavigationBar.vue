<template>
  <div class="container">
    <section class="item-left">
      <fa :icon="['fas', 'chess']" class="icon icon--medium" />
    </section>
    <section class="item-right">
      <div class="menu-link">
        <button>Mate</button>
        <button>Project</button>
      </div>
      <div class="menu-info" v-if="$props.isLogin">
        <fa :icon="['far', 'bell']" />
        <fa :icon="['far', 'user-circle']" />
      </div>
      <div class="menu-login" v-else @click="clickLoginBtn">
        <button>Login</button>
      </div>
    </section>
  </div>
  <login-modal v-model:visible="isShowLoginModal" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginModal from "@/components/pages/LoginModal.vue";

export default defineComponent({
  name: "NavigationBar",
  components: { LoginModal },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isShowLoginModal = ref(false);
    const clickLoginBtn = () => {
      isShowLoginModal.value = true;
    };

    return { isShowLoginModal, clickLoginBtn };
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 46px;
  display: flex;
  justify-content: space-between;
}

.item-right {
  display: flex;

  .menu-link {
    :first-child {
      margin-right: 8px;
    }

    margin-right: 20px;
  }
}
</style>
