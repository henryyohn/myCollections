<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <p>新增 特性：</p>
    <input type="text" @keyup.enter="addFeature" />
    <ul>
      <li
        @click="onClick(item)"
        v-for="item in features"
        :key="item.id"
        :class="{selected: item.selected}"
      >{{item.name}}</li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { Feature, FeatureSelect } from "../types";
import axios from "axios";
import { Test } from "@/myDecorator";

// class-style
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  count: number = 0;

  features: FeatureSelect[] = [];

  onClick(item: FeatureSelect) {
    item.selected = !item.selected;
    console.log(this.features);
  }

  @Emit()
  addFeature(e: KeyboardEvent) {
    //e.target.value会有错误提示，需要先进行类型断言
    // console.log(e.target.value)
    const inpt = e.target as HTMLInputElement;
    const value = inpt.value;
    const newF = {
      id: this.features.length + 1,
      name: value,
      selected: false
    };
    this.features.push(newF);
    inpt.value = "";
    this.count = this.features.length;
    return newF;
  }
  // 给出数字n，求1到n的数字和
  @Test([99999999999], 0)
  sum(n: number): number {
    return n * (n + 1) / 2
  }

  @Watch("count")
  onMsgChange(val: string, oldVal: any) {
    console.log(val, oldVal);
  }

  async created() {
    // this.features = [
    //   { id: 1, name: "类型注解", selected: true },
    //   { id: 2, name: "前端成长之路", selected: false }
    // ];
    const res = await this.$http.get<FeatureSelect[]>("/api/list");
    this.features = res.data;
    this.count = this.features.length;
  }
}

// options-style,支持不是特别好
// export default Vue.extend({

// })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
.selected {
  background-color: #42b983;
}
a {
  color: #42b983;
}
</style>
