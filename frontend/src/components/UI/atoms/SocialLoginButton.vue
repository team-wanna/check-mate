<template>
  <google-logo
    class="logo logo--google"
    v-if="$props.type === 'google'"
    @click="clickLoginBtn"
  />
  <fa
    v-else
    :icon="['fab', iconName]"
    class="logo fa-10x"
    :class="`logo--${$props.type}`"
    @click="clickLoginBtn"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SocialType } from '@/utils/define';
import GoogleLogo from '@/assets/GoogleLogo.vue';

export default defineComponent({
  name: 'SocialLoginButton',
  components: { GoogleLogo },
  props: {
    type: {
      type: String as PropType<SocialType>,
      default: '',
    },
  },
  setup(props) {
    const iconName =
      props.type === 'google' ? 'google' : `${props.type}-square`;

    const clickLoginBtn = () => {
      window.location.href = `${process.env.VUE_APP_BACKEND_URL}/api/auth/${props.type}`;
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
  }
  &--facebook {
    color: #4267b2;
  }
  &--github {
    color: #171515;
  }
}
</style>
