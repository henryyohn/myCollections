module.exports = {
  // publicPath: 'best-practice',
  devServer: {
    port: 7070
  },


  // webpack
// configureWebpack: {
//   name: 'vue最佳实践',
//   resolve: {
//     alias: {
//       comps: require('path').join(__dirname, 'src/components')
//     }
//   }
// }

configureWebpack: config => {
  config.resolve.alias.comps = require('path').join(__dirname, 'src/components')
  if(process.env.NODE_ENV === 'development') {
    config.name = 'best practice'
  } else {
    config.name = 'vue最佳实践'
  }
},

// 访问某个具体的插件或者配置，去修改，比如svg的spride来讲解
// chainWebpack本身也是一个函数
// chainWebpack(config){}
chainWebpack: config => {

}


}

