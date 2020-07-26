module.exports = {
  // publicPath: 'best-practice',
  publicPath: '/',
  devServer: { 
    port: 7070
  }
}

//webpack
configureWebpack: {
  resolve: {
    alias: {
      comps: require('path').join(__dirname ,'src/components')
    }
  }
}

// configureWebpack