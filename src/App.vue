<template>
  <div class="app">
    <nav class="nav">
      <RouterLink class="nav__link" to="/">Home</RouterLink>
      <RouterLink to="/recipes">Recipes</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style lang="scss">
@import "assets/base.scss";

.app {
  margin: 0 auto;
  width: 660px;
}

.nav {
  margin: 12px 0 24px;
  text-align: center;
  justify-content: center;
  align-items: center;

  &__link {
    margin: 0 12px;
  }
}
</style>
