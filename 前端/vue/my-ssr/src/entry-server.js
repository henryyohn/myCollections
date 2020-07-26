/* eslint-disable */
// 捡来和服务端渲染器交互
// 创建vue实例并渲染出来

import { createApp } from "./main"

export default context => {

  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context);
    // 跳转 首屏的地址
    router.push(context.url)

    // 等待路由的就绪
    router.onReady(() => {
      // // 预取数据: 判断是否存在asyncData选项
      // 获取匹配路由相关组件
      const comps = router.getMatchedComponents()
      // 遍历并执行可能存在asyncData目标
      Promise.all(comps.map(comp => {
        if (comp.asyncData) {
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 所有预取钩子 resolve 后，
        // store 已经填充入渲染应用所需状态
        // 将状态附加到上下文，且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。 
        context.state = store.state;
        //返回实例
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}