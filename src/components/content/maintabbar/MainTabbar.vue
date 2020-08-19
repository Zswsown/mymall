<!--将赋值的tabbar抽离出来，作为内容组件-->
<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="icon" src="../../../assets/images/tabbar/home.svg" alt="">
      <img slot="active-icon" src="../../../assets/images/tabbar/home_active.svg" alt="">
      <div slot="icon-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="icon" src="../../../assets/images/tabbar/category.svg" alt="">
      <img slot="active-icon" src="../../../assets/images/tabbar/category_active.svg" alt="">
      <div slot="icon-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart">
      <img slot="icon" src="../../../assets/images/tabbar/cart.svg" alt="">
      <img slot="active-icon" src="../../../assets/images/tabbar/cart_active.svg" alt="">
      <div slot="icon-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="icon" src="../../../assets/images/tabbar/profile.svg" alt="">
      <img slot="active-icon" src="../../../assets/images/tabbar/profile_active.svg" alt="">
      <div slot="icon-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from '../../common/tabbar/Tabbar'
  import TabBarItem from '../../common/tabbar/TabbarItem'

  export default {
    name: "MainTabbar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
