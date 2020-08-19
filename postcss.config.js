module.exports = {
  plugins: {
    autoprefixer: {},// 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    "postcss-px-to-viewport":{
      viewportWidth:375,//视图的宽度，对应的是我们设计稿的宽度
      viewportHeight:667,//视图的高度，对应的是我们设计稿的高度
      unitPrecision:5,//指定‘px’转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit:'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList:['ignore','tabbar','tabbar-item'],//指定不需要转换的类
      minPixelValue:1,//小于或等于‘1px’不转换为视窗单位
      mediaQuery:false,//允许在媒体查询中转换‘px’
      exclude:[/^TabbarItem.vue/]//指定不需要转换的vue文件
    }
  }
}
