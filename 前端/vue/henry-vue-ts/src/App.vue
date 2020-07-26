<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div @click="add">{{$store.state.counter.count}}</div>
    <div @click="asyncAddApp">{{myCount}}</div>
    <HelloWorld @add-feature="addF" msg="==你好啊=Welcome to Your Vue.js + TypeScript App==前端开发=" />
    <TsxComp msg="======TsxComp====="></TsxComp>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import TsxComp from "./components/TsxComp";
import { FeatureSelect } from "./types";
import CounterModule from "@/store/counter";

@Component({
  components: {
    HelloWorld,
    TsxComp
  }
})
export default class App extends Vue {
  addF(data: FeatureSelect) {
    console.log("add a new feature=", data.name);
  }

  get myCount() {
    return CounterModule.count;
  }

  add() {
    CounterModule.add();
  }
  asyncAddApp() {
    CounterModule.asyncAdd();
  }
}
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
