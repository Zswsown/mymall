import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 自定义一个提示框toast
import toast from './components/common/toast/index'

// 防止有些移动端有300ms毫秒延迟
import FastClick from 'fastclick'

// 图片懒加载插件
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 创建一个事件总线，用来解决图片加载时不可滚动的问题
Vue.prototype.$bus=new Vue()

// 安装toast插件
Vue.use(toast)

// 解决有些移动端有点击的300ms延迟
FastClick.attach(document.body)

// 安装图片懒加载插件，当滑动到需要的位置图片才会加载
Vue.use(VueLazyload,{
  // 当图片未加载出来时的占位图片，当图片加载完成时该照片会消失
  loading:require('./assets/images/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')


