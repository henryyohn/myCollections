/* eslint-disable */
// 激活
const { createApp } = require("./main");

const { app, router, store } = createApp()
// 在浏览器执行
// 还原store.state
// renderer会把它放在window.__INITIAL_STATE__
if(window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  console.log('mount====app')
  app.$mount('#app')
})