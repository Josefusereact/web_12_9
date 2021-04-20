<template>
  <div>
    <h1>{{ biaoti }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    biaoti: {
      require: false,
      type: String,
      default() {
        return "默认的标题";
      },
    },
  },
};
</script>

<style>
</style>