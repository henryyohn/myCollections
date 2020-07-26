/* eslint-disable */
const Koa = require('koa');
const app = new Koa();
// const Express = require('express')
// const app = Express()


const Vue = require('vue');

const { createRenderer } = require('vue-server-renderer');
const renderer = createRenderer();

const Router = require('vue-router')
Vue.use(Router)

// app.get('*', async (req, res) => {
//   if('/favicon.ico' === req.url) return
//   // router
//   const router = new Router({
//     routes: [
//       { path: '/', component: { template: '<div>===index===</div>' } },
//       { path: '/detail', component: { template: '<div>===about===</div>' } }
//     ]
//   });
//   // vue instance
//   const vm = new Vue({
//     router,
//     template: `
//     <div>
//       <router-link to="/">index</router-link>
//       <router-link to="/detail">about</router-link>
//       <div>{{name}}</div>
//       <router-view></router-view>
//     </div>
//     `,
//     data() {
//       return {
//         name: 'henry come on!',
//       }
//     },
//   });

//   try {
//     // console.log(router)
//     router.push(req.url)
//     // 渲染：得到html字符串
//     const html = await renderer.renderToString(vm);
//     res.send(html)
//   } catch (error) {
//     res.status(500).send('服务器错误了')
//   }
// })

//  
app.use(async (ctx, next) => {
  // router
  const router = new Router({
    routes: [
      { path: '/', component: { template: '<div>===index===</div>' } },
      { path: '/about', component: { template: '<div>===about===</div>' } }
    ]
  });
  // vue instance
  const vm = new Vue({
    router,
    template: `
    <div>
      <router-link to="/">index</router-link>
      <router-link to="/about">about</router-link>
      <div>{{name}}</div>
      <router-view></router-view>
    </div>
    `,
    data() {
      return {
        name: 'henry come on!',
      }
    },
  });
  router.push(ctx.url)
  // 渲染：得到html字符串
  const html = await renderer.renderToString(vm);

  ctx.body = html;
})

app.listen(3232)
