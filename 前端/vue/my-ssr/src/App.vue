<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
    <p>{{$store.state.count}}</p>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  // components: {
  //   HelloWorld,
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
