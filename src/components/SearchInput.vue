<template>
  <input
      placeholder="Search foods and servings...;"
      class="search"
      v-model="input"
      type="text"
  />
</template>

<script lang="js">
export default {
  //define a reactive data to bind to the input to enable two-way data binding
  data: () => ({
    input: '',
  }),
  watch: {
    input: {
      //create a watcher for the search input value and emit the value to the parent component (RecipesView)
      handler(val) {

        //emit the value only if the input value is truthy and is not empty
        if (!!val && val.length !== '') {
          this.$emit('searching', val.trim())
        }
      }
    }
  },
}
</script>

<style lang="scss">
.search {
  border: 1px solid #ebebeb;
  padding: 16px 12px;
  border-radius: 30px;
  display: block;
  margin-bottom: 12px;
  width: 100%;
  transition: all 0.15s ease-out;
  font-size: 16px;
  color: #282c37;

  &:focus {
    outline: none;
    border: 1px solid #1bc98e;
  }
}

</style>
