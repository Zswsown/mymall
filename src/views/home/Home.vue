<template>
    <div id="home">
      <!--      给navbar绑定class，方便其设置不同的background-color-->
      <nav-bar class="home-nav" ref="homenavbar"><div slot="nav-center">小商城</div></nav-bar>

      <!--      吸顶的标题栏-->
      <!--      用v-show来决定新创建的标题栏是否显示，达到吸顶效果-->
      <tab-control :titles="titles"
                   @tabControlClick="tabControlClick"
                   ref="toggletabcontrol"
                   class="toggletabcontrol"
                   v-show="isToggleTabControlShow"></tab-control>

      <!--      scroll为封装的better-scroll组件，
                better-scroll有wrapper(父)和content(子)两个div，我们需要给content设定指定的高度height
                ref="scroll"是用来指定该scroll组件的
                :probeType=“3”用来给该事件指定监听类型的
                :pull-to-load="true"用来指明该事件是可以触发上拉加载事件的
                @scroll="scrollContent"事件是用来判断返回顶部按钮是否显示的
                @pullingUp="loadMore"事件是用来加载指定title的数据的-->
      <scroll class="scrollContent"
              ref="scroll"
              :probeType="3"
              :pull-to-load="true"
              @scroll="scrollContent"
              @pullingUp="loadMore">
        <!--      轮播图
                  将轮播图照片数组传进封装好的swiper子组件中，利用v-for循环遍历传进去的banners，
                  将每一个item传进swiperItem，利用v-bind在子子组件swiperItem中绑定需要展示的属性-->

        <home-swiper :banners="banners"
                     @homeSwiperImageLoad="homeSwiperImageLoad"
                     ref="homeswiper"></home-swiper>
        <!--      每日推荐-->
        <home-recommend :recommends="recommends"></home-recommend>
        <!--      本周流行-->
        <home-feature></home-feature>
        <!--      标题栏-->
        <tab-control :titles="titles" @tabControlClick="tabControlClick" ref="tabcontrol"></tab-control>
        <!--      商品列表-->
        <goods-list :goodsList="showGoodsList" ref="homegoodslist"></goods-list>
      </scroll>

      <!--      被混入backToTopMixin中了-->
      <!--      返回顶部按钮,组件是不可以直接添加监听事件的，
                利用.native才可以直接监听事件
                （之前的是监听子组件中抛出的事件，this.$emit('事件名',参数)）
                用isShowBackToTop来控制返回顶部按钮是否显示，
                因为涉及频繁切换，所以使用v-show-->
      <back-to-top @click.native="backToTop" v-show="isShowBackToTop"></back-to-top>
    </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import Scroll from "../../components/common/scroll/Scroll";
  // 被混入backToTopMixin中了
  // import BackToTop from '../../components/common/backtotop/BackToTop'

  import TabControl from '../../components/content/tabControl/TabControl'
  import GoodsList from '../../components/content/goodsList/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomeFeature from "./childComps/HomeFeature";

  import {
    // 监听图片加载
    goodsItemImageListenerMixin,
    // 返回顶部按钮
    backToTopMixin,
  } from "../../common/mixin";

  import {
    getMultiData,
    getHomeGoodsData
  } from "../../network/home";

  /*被混入mixin中了
  import{
    debounce
  } from "../../common/utils";
  */

  export default {
    name: "Home",
    data(){
      return {
        // 轮播图
        banners:[],

        // 每日推荐
        recommends:[],

        // 标题栏
        titles:['流行','新款','精选'],
        POP:'pop',
        NEW:'new',
        SELL:'sell',

        // 商品列表，一次性保留这三种商品的数据，避免来回切换标题时重复请求数据，
        // 加载页面时发送一次商品数据的请求，之后只有上拉操作才可触发商品数据的请求
        goodsList:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },

        // 当前标题栏的title值，默认为流行pop
        currentTitleEng:'pop',

        /* 放在混入backToTopMixin中了
        // 设置返回顶部按钮是否显示，默认不显示
        isShowBackToTop:false,

        // 滚动距离的临界值,在首页中该临界值用来判断返回顶部按钮是否显示
        criticalScrollY:1000,
        */

        // tabControl的offsetTop值
        tabControlOffsetTop:0,

        // 控制吸顶的tabControl是否显示
        isToggleTabControlShow:false,

        // 离开页面时的位置信息
        leavePotion: {
          x:0,
          y:0,
        },

        // 页面滚动的距离
        currentScrollY:0,
      }
    },

    mixins:[
      // 监听图片加载
      goodsItemImageListenerMixin,
      // 返回顶部按钮
      backToTopMixin
    ],

    components:{
      // 导航（“购物街”）
      NavBar,

      // 封装的better-scroll组件
      Scroll,

      /*
      被混入backToTopMixin中了
      返回顶部按钮
      BackToTop,
      */

      // 标题栏
      TabControl,

      // 商品列表
      GoodsList,

      // 轮播图
      HomeSwiper,

      // 每日推荐
      HomeRecommend,

      // 本周流行
      HomeFeature
    },

    created(){
      // 1.请求首页的多条数据
      this._getMultiData()

      // 2.请求标题栏中的商品数据
      this._getHomeData('pop')
      this._getHomeData('new')
      this._getHomeData('sell')
    },

    mounted() {
      // 1.监听item中图片是否加载完成，每次图片加载完成，就对scroll进行一次刷新

      /*为啥要监听图片加载完成？
      * 在better-scroll中，scrollHeight属性是用来决定该组件可滚动区域的大小的
      * scrollHeight属性的值的大小是根据better-scroll的content中子组件的高度来决定的
      * 当页面刚加载时，scrollHeight属性的值是没有将图片的高度计算在内的
      * 所以，刚开始计算出来的值是错误的
      * 后来当页面的图片都加载好了，有了新的高度，scrollHeight属性的值是没有进行更新的
      * 所以滚动出现了问题
      * */

      /*解决该问题的三种方法
      * 一：利用父子组件的通信
      * 在GoodsListItem组件中监听图片是否加载完成，完成了则发出一个事件到GoodsList组件中，GoodsList组件接收到该事件后发出一个事件通知Home组件,
      * Home组件接收到该事件则调用this.$refs.scroll.scroll.refresh()方法对scroll组件中的scroll对象进行刷新，则scrollHeight属性值会重新计算
      *
      * 二：利用状态管理模式Vuex
      * 每次GoodsListItem中的照片加载好了，就修改Vuex中某一个属性，然后让Home组件中引用该属性并对其进行实时监听，
      * 若该属性发生变化时，Home组件则调用this.$refs.scroll.scroll.refresh()方法对scroll组件中的scroll对象进行刷新，
      * 则scrollHeight属性值会重新计算
      *
      * 三：利用事件总线
      * 事件总线主要是用来监听事件的，在入口文件main.js中定义该Vue文件的prototype上有事件总线$bus，且该事件总线赋值为一个Vue实例，Vue.prototype.$bus=new Vue()
      * 在GoodsListItem组件中，每次图片加载完成时，就向事件总线发射一个事件，this.$bus.$emit(事件名)
      * 在Home组件中，用this.$bus.$on(事件名，处理该事件的函数)来调用this.$refs.scroll.scroll.refresh()方法对scroll组件中的scroll对象进行刷新，
      * 则scrollHeight属性值会重新计算
      *
      * 如何监听图片加载完？
      * (1)javaScript原生方法img.onload=function(){}
      * (2)vue中监听加载，@load="方法名"
      *
      * 因为每次上拉操作会请求来多个商品，如果都调用刷新函数的话，会调用的非常频繁，所以我们可以利用防抖函数来减少n秒内调用refresh函数的次数
      *
      * 防抖函数：
      * 概念：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
      * 缺点：事件只有在计时器结束后才可被执行
      * 代码：
      * function debounce(func,delay){
      *   let timer=null;
      *   return function(...args){
      *     if(timer) clearTimeOut(timer)
      *     timer=setTimeOut(()=>{
      *       func.apply(this,args)
      *     },delay)
      *   }
      * }
      *
      * 防抖函数会有返回值，我们可以用一个常量来保存防抖函数的返回值，相当于
      * const refresh = function(...args){
      *   if(timer) clearTimeOut(timer)
      *   timer=setTimeOut(()=>{
      *     func.apply(func,args)
      *   },delay)
      * }
      * 这样看的话，相当于debounce被调用一次，而里面的function被调用多次，
      * 如果在delay内没有新的调用，则会执行func,如果有新的调用传进来，则清空前面的计时器，重新设置定时器
      *
      */

      /*被抽离到混入mixin里面了
      * //注意this.$refs.scroll.refresh不要加括号，不然调用的是它函数的返回值
      * const refresh=debounce(this.$refs.scroll.refresh,200);
      * // 接收GoodsListItem发射出来的itemImageLoad事件
      * this.$bus.$on('itemImageLoad',()=>{
      *   // 进行刷新，scrollHeight会进行重新计算
      *   refresh();
      * })
      */
    },

    /*
    * 保留离开时的位置,当我们重新回到该页面时仍停留在离开时的位置
    * （1）首先在App.vue中使用<keep-alive></keep-alive>标签，使我们在离开路由页面时，页面不会被销毁掉
    * （2）使用 未激活deactived() 和 激活actived() 这两个方法
    * （3）当我们离开该页面时，在deactived()中用一个变量leavePosition保留离开时的位置，
    * （4）当我们点回该页面时，在actived()中利用scroll组件的scrollTo()滚动到leavePotion位置，记得滚动时间设置为0
    * （5）记得在actived()中调用refresh()方法进行刷新，防止点回该页面时页面不能滚动
    * */

    deactivated() {
      // 得到离开该页面时的位置信息
      this.leavePotion=this.$refs.scroll.getScrollPosition()
      // console.log(this.leavePotion)

      // 在页面未激活时注销掉该全局监听函数
      this.$bus.$off('itemImageLoad',this.goodsItemImageLoad)
    },

    activated() {
      // 滚动到离开该页面时的位置
      this.$refs.scroll.scrollTo(this.leavePotion.x,this.leavePotion.y,0)
      this.$refs.scroll.refresh();
    },

    computed:{
      // 返回被点击的title对应的商品列表
      showGoodsList(){
        return this.goodsList[this.currentTitleEng].list;
      }
    },

    methods:{
      /*
        网络请求的方法
      */

      // 请求首页的多条数据，如轮播图照片等，封装的request网络请求模块返回的是一个Promise对象，所以可以直接调用then()和catch()方法
      _getMultiData(){
        getMultiData().then(res=>{
          // 轮播图照片数组
          this.banners=res.data.data.banner.list
          // console.log(this.banners)
          // 推荐照片数组
          this.recommends=res.data.data.recommend.list
          // console.log(this.recommends)
        }).catch(err=>{
          console.log(err)
        })
      },

      // 页面刚加载时请求标题栏的商品数据
      _getHomeData(type){
        // 初始页面的页数为0,每次调用该方法进行请求数据前需先将页数自增1，表示要请求下一页的数据
        this.goodsList[type].page++;
        getHomeGoodsData(type,this.goodsList[type].page).then(res=>{
          // console.log(res)
          // 请求相应类型的商品数据，"...参数"表示将该数组解构后添加到前一个数组，即this.goodsList[type].list中
          this.goodsList[type].list.push(...res.data.data.list)
          // 若是上拉操作，则结束此次上拉操作，才可以进行下一次上拉操作，注意该函数不可放在外面，
          // 箭头函数this一般会指向全局，而function中的this则是先看该function中有无该调用的对象/方法/data
          this.$refs.scroll.finishPullUp();
        })
      },

      /*
        事件监听的方法
      */

      // 标题栏的title被点击时，会调用该方法进行取对应的title的英文名，并将取来的值赋值给商品列表GoodsList
      tabControlClick(index){
        switch(index){
          case 0:
            // 流行
            this.currentTitleEng=this.POP;
            break;
          case 1:
            // 新款
            this.currentTitleEng=this.NEW;
            break;
          case 2:
            // 热卖
            this.currentTitleEng=this.SELL;
            break;
        }

        // 防止滑动边界tabControl被点击的title显示不一致
        this.$refs.tabcontrol.currentIndex=index
        this.$refs.toggletabcontrol.currentIndex=index
        /*
        * 当用户在某一个title里面浏览商品,之后切换另外一个title时，需要让页面滚动到该title第一个商品的顶部
        * (1)当tabControl未吸顶时，我们可以忽略该效果，当tabControl吸顶时，我们可以用一个变量currentScrollY来保存当前滚动的距离-position.y
        * (2)当我们在切换title时，要返回点击的title的首个商品的位置，可以利用scroll组件的scrollTo方法，滚动到该位置
        * (3)返回的位置 = tabControl距离顶部的位置
        * */
        // 切换title时滚动到该title的第一个商品的位置
        if(this.isToggleTabControlShow){
          if(this.currentScrollY>this.tabControlOffsetTop){
            this.$refs.scroll.scrollTo(0,-this.tabControlOffsetTop,300);
          }
        }
      },

      /* 放在混入backToTopMixin中了
      // 当返回顶部的按钮被点击后，利用ref="scroll"取到首页的滚动组件，
      // 调用封装好的better-scroll组件中data的scroll的scrollTo(x,y,duration)方法,令它滚动到顶部
      // 记得要用手指滑动，不要用鼠标直接滚动，不然返回顶部按钮不会生效
      backToTop(){
        this.$refs.scroll.scrollTo(0,0);
      },
      */

      // 利用在scroll组件上给监听类型probeType绑定3(:probeType="3",实时监听并派发滚动事件，包含手指滑动时的惯性滚动)，
      // 实时接收封装好的scroll组件传出来的监听滚动的事件(包含参数position)，
      // 我们可以在首页设置一个临界值，当滚动的距离超过了这个临界值，则返回顶部按钮显示，没超过则不显示
      scrollContent(position){
        /* 放在混入backToTopMixin中了
        // 决定返回顶部的按钮是否显示
        this.isShowBackToTop=-position.y>this.criticalScrollY;
        */

        // backToTopMixin中封装的决定返回顶部按钮是否显示的方法getBackToTopShow
        this.getBackToTopShow(position)

        // 当我们滚动的距离超过tabControl距离顶部的距离时，isToggleControlShow为真，显示吸顶效果
        this.isToggleTabControlShow=-position.y>this.tabControlOffsetTop;

        // 将滚动的距离赋值给定义的变量currentScrollY
        this.currentScrollY=-position.y;
      },

      // 上拉加载更多，注意每一次进行上拉操作前，要先对上一次上拉操作进行结束，否则上拉会失败（看_getHomeData(type)）
      loadMore(){
        this._getHomeData(this.currentTitleEng)
      },

      /*
      * 完成吸顶效果的方法
      * 在home页面中再创建一个tabControl组件，它是标准流，会被覆盖在scroll组件下，我们设置position：relative，z-index:9让其显示在最顶部
      * v-show用来控制其是否显示
      * 而决定该新创建的tabControl的显示与否 由我们计算到的tabControl的offsetTop值 与 由scrollContent()中滚动的距离-position.y 来决定
      * 用布尔型变量isToggleTabControl来存储该比较值
      * 当原tabControl滚动距离超过它的offsetTop值时，则isToggleTabControl为true，v-show=“isToggleTabControl”会显示出新创建的tabControl组件
      * 达到吸顶效果
      *
      * 会出现的bug:
      * 两个tabControl被点击的title要保留一致，所以需要设置其currentIndex=index,
      * 避免滑动临界显示的被点击的title不一致
      */

      // 首页的轮播图第一张照片加载完成后会通知Home组件，告诉Home组件可以计算tabControl的offsetTop值了，以期完成tabControl的吸顶效果
      // $el属性是用来取组件对应的DOM元素的，我们可以利用其取到tabControl组件对应的div,调用DOM元素的offsetTop属性进行取值
      homeSwiperImageLoad(){
        // 计算tabControl此时的offsetTop值
        this.tabControlOffsetTop=this.$refs.tabcontrol.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    /*将home的高度设置为视窗全部高度*/
    height:100vh;
    /*使用相对定位,便于滚动区域scroll使用绝对定位*/
    position:relative;
  }
  .home-nav{
    /*tint-color值的设置会影响到以视图为根视图的整个视图层次结构*/
    background: var(--color-tint);
    color: #fff;
  }
  /*吸顶的tabControl样式*/
  .toggletabcontrol{
    position:relative;
    /*z-index属性只有在有定位position时才会生效*/
    z-index:9;
    /*防止背景透明*/
    background: #fff;
  }
  .scrollContent{
    /*使用绝对定位，将可滚动的区域限定为除navbar和tabbar区域，不用设置特定的高度*/
    position:absolute;
    left:0;
    right:0;
    top:44px;
    bottom:49px;

    /*此时已脱离标准流，为了避免标准流的内容显示在该组件内容下面，将背景颜色设置为白色*/
    background: #fff;
  }
</style>
