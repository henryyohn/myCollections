const Sequelize = require('sequelize');
module.exports.initModel = async sequelize => {
  // ##BEGIN## 代码已加密
  //   ### 04 sequelize + sqllite3 实现一个一对多关系
  // - 本例中使用内存数据库模拟不需要安装数据库
  // - 根据测试用例内容建立用户和商品数据模型
  // - 并设置合理的数据关系
  // - 使数据模型生效
  //暗号：哈希算法暗号：哈希算法暗号：哈希算法暗号：哈希算法
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: Sequelize.STRING
  }, {tableName: 'User'})

  const Product = sequelize.define('Product', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: Sequelize.STRING,
    price: Sequelize.DOUBLE,
    // userId: Sequelize.INTEGER
  })

  Product.belongsTo(User, {
    constraints: true, onDelete: 'CASCADE'
  });
  User.hasMany(Product)

  await User.sync()
  await Product.sync()

  return { User, Product }


  // JEHJEHOJPOEIOSSOEXJEHJXIJEHOEIOSSOEHOPJOSSOEJOSXOPHOSSJHOOSOOSSOSEOSXOESOSSJPPJPEOPJOEIOSSOEXJPEJPAJEHOPX
  // JEHJEHJEHJEHOSXOSOJXPJEHOPX
  // JEHJEHJEHJEHJEHJEHOEAOPPOEPOSSJXPJEHOJSOSSOEHOPJOSSOEJOSXOPHOSSJHOJAOJAXOJEJIXJIAJIXOJOJPA
  // JEHJEHJEHJEHJEHJEHOOIOPJOEAOEEJAOOESOSJOEXOSSOEOOSSOESOEAJXPJEHOEAOEXOPJOSSJPA
  // JEHJEHJEHJEHJEHJEHOOIOEJOEJOEEOPSJAXOPJOEJOEJJXPJEHOSEOOIOEJOEIOSSJPA
  // JEHJEHJEHJEHJEHJEHOEPOEXOSXOEOOOIOEXOPPJAEOSSOPPJXPJEHOEAOEXOPJOSS
  // JEHJEHJEHJEHOPAJPA
  // JEHJEHJEHJEHOESOOIOEOOSSJXPJEHOJSOSSOEHOPJOSSOEJOSXOPHOSSJHOOJSOJEOJOJAOJAXJIA
  // JEHJEHOPAJPHJXH

  // JEHJEHJAAOEXOEEOSOOPJOSJOEAJEHJXIJEHOEIOSSOEHOPJOSSOEJOSXOPHOSSJHOOSOOSSOSEOSXOESOSSJPPJPEOEPOEXOEEOSOOPJOSJOEAJPEJPAJEHOPX
  // JEHJEHJEHJEHOSXOSOJXPJEHOPX
  // JEHJEHJEHJEHJEHJEHOEAOPPOEPOSSJXPJEHOJSOSSOEHOPJOSSOEJOSXOPHOSSJHOJAOJAXOJEJIXJIAJIXOJOJPA
  // JEHJEHJEHJEHJEHJEHOOIOPJOEAOEEJAOOESOSJOEXOSSOEOOSSOESOEAJXPJEHOEAOEXOPJOSSJPA
  // JEHJEHJEHJEHJEHJEHOOIOEJOEJOEEOPSJAXOPJOEJOEJJXPJEHOSEOOIOEJOEIOSSJPA
  // JEHJEHJEHJEHJEHJEHOEPOEXOSXOEOOOIOEXOPPJAEOSSOPPJXPJEHOEAOEXOPJOSS
  // JEHJEHJEHJEHOPAJPA
  // JEHJEHJEHJEHOEAOSXOEAOEJOSSJXPJEHOPX
  // JEHJEHJEHJEHJEHJEHOEAOPPOEPOSSJXPJEHOJSOSSOEHOPJOSSOEJOSXOPHOSSJHOOJSOJEOJOJAOJAXJIAJPA
  // JEHJEHJEHJEHJEHJEHOOIOEJOEJOEEOPSJAXOPJOEJOEJJXPJEHOSEOOIOEJOEIOSS
  // JEHJEHJEHJEHOPAJPA
  // JEHJEHOPAJPHJXH
  // JEHJEHJAAOEXOEEOSOOPJOSJOEAJHOOOAOSSOEJOEEOESOSPOEIOJEOEEJPPOJPOEIOSSOEXJPAJEHOPX
  // JEHJEHJEHJEHOSJOEEOESOEIOEAOEXOOIOSXOESOEAOEIJXPJEHOEAOEXOPJOSSJPA
  // JEHJEHJEHJEHOEEOESJIHOSSOEJOSSOEAOSSJXPJEHJPEJIPJISOJSJIPJISJIHJIXJPE
  // JEHJEHOPAJPHJXH
  // JEHJEHOJPOEIOSSOEXJHOOSHOOIOEIJAHOOIOESOPPJPPJAAOEXOEEOSOOPJOSJOEAJPHJXH
  // JEHJEHOOIOPSOOIOSXOEAJEHOEIOSSOEHOPJOSSOEJOSXOPHOSSJHOOEIOPPOESOSJJPPOEAOEXOPJOSSJPH
  // ##END##
  // return { User, Product }
} 
