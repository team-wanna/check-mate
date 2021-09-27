<template>
  <navigation-bar/>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import NavigationBar from '@/components/UI/organisms/NavigationBar';

export default {
  name: 'BaseLayout',
  components: {NavigationBar}
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 1200px;
  overflow: auto;
}
</style>