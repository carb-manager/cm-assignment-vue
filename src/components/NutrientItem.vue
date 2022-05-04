<template>
  <div class="nutrient-item">
    <div v-if="name">{{ name }}</div>
    <span> {{ value }} </span>
  </div>
</template>

<script>
export default {
  props: ["name", "value"],
};
</script>

<style scoped>
.nutrient-item {
  text-align: right;
  min-width: 65px;
  font-weight: 500;
  color: #6f7379;

  div {
    font-size: 16px;
  }
}
</style>
