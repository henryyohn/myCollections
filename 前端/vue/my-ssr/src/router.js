/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// 工厂函数，每次服务器请求都是一个新的实例
export function createRouter() {
  console.log('router====1')
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'home', component: Home },
      { path: '/about', name: 'about', component: () => import('./views/About.vue') }
    ]
  })
}

