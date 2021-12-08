<template>
  <div class="project-card">
    <div class="project-card__container">
      <div class="project-card__header">
        <span class="project-icon-container">
          <img
            class="project-icon"
            src="@/assets/logo.png"
            alt="project icon"
          />
        </span>
        <p>{{ $props.title }}</p>
      </div>
      <div class="project-card__intro">{{ $props.intro }}</div>
      <div class="project-card__skill">Vue</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    title: {
      type: String,
      default: 'Project Title',
    },
    intro: {
      type: String,
      default: 'Project Intro',
    },
  },
};
</script>

<style lang="scss" scoped>
.project-card {
  width: calc(30%);
  min-width: 288px;
  background-size: cover;
  border-radius: 14px;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgb(0 0 0 / 15%);
  transition: 0.3s ease;
  &__header {
    display: flex;
    align-items: center;
  }
}
.project-card:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 15px rgb(145 71 255 / 80%);
}
.project-card__container {
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  padding: 20px;
  font-size: 16px;
  border-radius: 14px;
  cursor: pointer;
}
.project-card__intro {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6em;
  margin-top: 20px;
  margin-left: 5px;
  border-bottom: 1 px solid $--color-border;
  padding-bottom: 20px;
}
.project-card__skill {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 16px;
}
.project-icon {
  width: 20%;
  min-width: 30px;
  margin-right: 10px;
}
</style>
