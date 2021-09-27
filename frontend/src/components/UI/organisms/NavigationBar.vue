<template>
  <div class="container">
    <section class="item-left">
      <button>CheckMate</button>
    </section>
    <section class="item-right">
      <div class="menu-link">
        <button>Mate</button>
        <button>Project</button>
      </div>
      <div class="menu-info" v-if="$props.isLogin">
        <button>
          Alarm
        </button>
        <button>
          Info
        </button>
      </div>
      <div class="menu-login">
        <button>
          Login
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavigationBar',
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    }
  }
})
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