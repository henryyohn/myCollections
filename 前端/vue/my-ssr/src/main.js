/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router.js'
import { createStore } from './store.js'

Vue.config.productionTip = false;

// 改在成工厂函数，每个请求返回一个vue实例
// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');

Vue.mixin({
  beforeMount() {
    console.log('===1===', this.$options, this.dataPromise)
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务 
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
    console.log('===2===', this.$options, this.dataPromise)
  }
  });

export function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    context,// 用于和外面的renderer交互
    render: (h) => h(App)
  })

  return { app, router, store }
}
