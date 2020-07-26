/* eslint-disable */

const express = require('express')
const app = express()

// 获取文件路径
const resolve = dir => require('path').resolve(__dirname, dir);
// 第 1 步:静态文件服务：开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由 
app.use(express.static(resolve('../dist/client'), { index: false }));
// 第 2 步:获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
// 第 3 步:服务端打包文件地址
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json");
// 第 4 步:创建渲染器
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
});

// app.get('*', async (req, res) => { // 设置url和title两个重要参数 
//   const context = {
//     title: 'ssr test',
//     url: req.url
//   }
//   const html = await renderer.renderToString(context);
//   res.send(html)
// })
app.get('*', async (req, res) => {
  try {
    const context = {
      title: 'henry Title',
      url: req.url
    }
    // 渲染：得到html字符串
    const html = await renderer.renderToString(context);
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器错误' + error)
  }


})

app.listen(3232)