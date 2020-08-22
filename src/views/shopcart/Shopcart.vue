<template>
    <div id="shopcart">
      <!--      购物车导航栏-->
      <!--      <nav-bar class="shopcartNav"><div slot="nav-center">购物车({{shopcartListLength}})</div></nav-bar>-->
      <nav-bar class="shopcartNav">
        <div slot="nav-left" class="shopcartNavLeft">购物车</div>
        <div slot="nav-right"
             class="shopcartNavRight"
             @click="deleteClick">{{navBarRightText}}</div>
      </nav-bar>

      <!--      封装的滚动组件-->
      <scroll class="shopcarContent" ref="scroll">
        <!--      购物车列表-->
        <shopcart-list :shopcart-list="shopcartList"></shopcart-list>
      </scroll>

      <!--      结算及删除底部栏,isNavActive是指“管理按钮被点击了没有”-->
      <shopcart-bottom-bar :is-nav-active="isNavActive"></shopcart-bottom-bar>
    </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";

  import ShopcartList from "./childComps/ShopcartList";
  import ShopcartBottomBar from "./childComps/ShopcartBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  // 注意这里要从vuex中导入，mapGetters是运行后封装在vuex中的方法
  import { mapGetters } from 'vuex'

  export default {
    name: "Shopcart",
    components:{
      // 购物车导航栏
      NavBar,
      // 购物车商品列表
      ShopcartList,
      // 购物车结算底部栏
      ShopcartBottomBar,
      // 封装的滚动组件
      Scroll,
    },
    computed:{
      /*mapGetters方法是将在getters中的方法转换成计算属性的函数，有两种声明方法
       * (1)...mapGetters(['getters中的函数名'])
       * (2)...mapGetters({'别名':'getters中的函数名'})
      * */
      ...mapGetters([
        // 购物车商品的数量
        'shopcartListLength',
        // 购物车商品列表
        'shopcartList',
      ])
    },
    data(){
      return{
        // 默认管理按钮没被点击
        isNavActive:false,
        // 默认navBar右侧为“管理”
        navBarRightText:"管理"
      }
    },

    deactivated() {
      // 页面发生跳转的话，则在下次进入该页面还是显示“管理”图标
      this.isNavActive=false;
      this.navBarRightText="管理";
    },

    // 每当详情页添加商品进购物车时，会触发购物车页面进行刷新操作,防止购物车页面不可以滚动
    updated() {
      // console.log('---')
      this.$bus.$on('shopcartScrollRefresh',this.$refs.scroll.refresh());
    },

    methods:{
      deleteClick(){
        // 将激活取反，更改点击后的样式，
        // 即当为“管理”被点击时，则该处位置显示“完成”，且结算图标显示为删除按钮；
        // 当为“完成”被点击时，则该处位置显示“完成”，且删除按钮显示为结算按钮。
        this.isNavActive=!this.isNavActive;

        if(this.isNavActive){
          this.navBarRightText="完成";
        }
        else{
          this.navBarRightText="管理";
        }
      }
    }
  }
</script>

<style scoped>
  /*.shopcartNav{*/
  /*  background: var(--color-tint);*/
  /*  color:#fff;*/
  /*}*/
  .shopcartNav{
    color:#5b5b5b;
    font-size: 13px;
    background: #fff;
  }

  .shopcartNavLeft{
    color:#000;
    font-size: 14px;
  }

  .shopcarContent{
    /*使用绝对定位，将可滚动的区域限定为除navbar和tabbar区域，不用设置特定的高度*/
    position:absolute;
    left:0;
    right:0;
    top:44px;
    bottom:89px;

    /*此时已脱离标准流，为了避免标准流的内容显示在该组件内容下面，将背景颜色设置为白色*/
    background: #f2f2f2;
  }

</style>
