<template>
  <div>
    <p>home-page</p>
    <p>{{name}}</p>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      name: 'helloWorld-home',
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('getCount');
  },
};
</script>

<style>

</style>
