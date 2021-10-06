<template>
  <google-logo v-if="$props.type === 'google'" class="logo logo--google" />
  <fa
    v-else
    :icon="['fab', iconName]"
    class="logo fa-10x"
    :class="`logo--${$props.type}`"
    @click="clickLoginBtn"
  />
</template>

<script lang="ts">
import { SocialType } from "@/utils/define";
import { defineComponent, PropType } from "vue";
import GoogleLogo from "@/assets/GoogleLogo.vue";

export default defineComponent({
  name: "SocialLoginButton",
  components: { GoogleLogo },
  props: {
    type: {
      type: String as PropType<SocialType>,
      default: "",
    },
  },
  setup(props) {
    const iconName =
      props.type === "google" ? "google" : `${props.type}-square`;

    const clickLoginBtn = () => {
      window.location.href = `http://localhost:8080/api/auth/${props.type}`;
    };

    return {
      iconName,
      clickLoginBtn,
    };
  },
});
</script>

<style lang="scss" scoped>
.logo {
  cursor: pointer;
  margin: 0 20px;
  border-radius: 10px;
  &--google {
    margin: 10px 20px;
    padding: 20px;
    box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
  }
  &--facebook {
    color: #4267b2;
  }
  &--github {
    color: #171515;
  }
}
</style>
