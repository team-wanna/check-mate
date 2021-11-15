<template>
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

<style lang="scss" scoped>
.container {
  width: calc(50vw);
  margin: calc($--nav-height * 2) auto;
}
</style>
