<template>
  <div class="welcome">
    <h1 class="welcome__header">
      Hi, <code>&#123;&#123; Matias &#125;&#125;</code>!
    </h1>
    <p class="welcome__text">Welcome to <code>cm-assignment-vue</code>.</p>
    <p class="welcome__text">
      There's a <RouterLink to="/recipes">recipes view</RouterLink> that needs
      some work. See the
      <a
        href="https://github.com/carb-manager/cm-assignment-vue/blob/main/README.md"
      >
        <code>README.md</code>
      </a>
      file for more details.
    </p>
  </div>
</template>

<style lang="scss">
.welcome {
  &__header {
    margin: 12px 0;
  }

  &__text {
    margin: 0 0 12px 0;
  }
}
</style>
