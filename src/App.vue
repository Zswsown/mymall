<template>
  <div id="app">
    <!--    对应的路由页面-->
    <!--    为了防止不同商品点击后详情页没有渲染，将Detail组件排除在<keep-alive></keep-alive>外面-->
    <keep-alive exclude="Detail">
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <!--    底部tabbar-->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/maintabbar/MainTabbar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import './assets/css/base.css';


</style>
