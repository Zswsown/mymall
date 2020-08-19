<template>
  <div id="tabContentContainer">
    <!--      吸顶的标题栏-->
    <!--      用v-show来决定新创建的标题栏是否显示，达到吸顶效果-->
    <tab-control :titles="titles"
                 @tabControlClick="tabControlClick"
                 ref="toggletabcontrol"
                 class="toggletabcontrol"
                 v-show="isToggleTabControlShow"></tab-control>

    <!--  监听子分类标签和其对应的商品内容的滚动，便于实现tabControl在某个位置吸顶 和 返回顶部按钮的功能的实现-->
    <scroll class="tabContent"
            ref="scroll"
            @scroll="categoryContentScroll"
            :probe-type="3">

      <!--    分类页分类标签对应的子标签内容-->
      <!--      需要监听子分类标签中图片是否加载完成，若加载完成，才可以计算tabControl的offsetTop值，以期达到标签选择器的吸顶效果-->
      <tab-content-category
        :subcategories="subcategory"
        @imageLoad="catetegoryImageLoad"></tab-content-category>

      <!--    分类页分类标签对应的子标签对应的商品类型-->
      <tab-control :titles="titles"
                   @tabControlClick="tabControlClick"
                   ref="tabcontrol"
                   class="tabControl"
                   :class="{tabControlHidden:isToggleTabControlShow}"></tab-control>

      <!--    分类页分类标签对应的子标签对应的商品数据-->
      <tab-content-datail :goods-list="categoryDetail"></tab-content-datail>
    </scroll>

    <!--    监听组件的原生事件要用.native，backToTop方法是让页面滚动到顶部，
    isShowBackToTop是通过页面的滚动距离跟我们设置的临界值比较，决定是否让返回顶部按钮显示-->
    <back-to-top @click.native="backToTop" v-show="isShowBackToTop"></back-to-top>
  </div>
</template>

<script>
  import TabContentCategory from "./TabContentCategory";
  import TabContentDatail from "./TabContentDatail";

  import Scroll from "../../../components/common/scroll/Scroll";
  import TabControl from "../../../components/content/tabControl/TabControl";

  import {POP,NEW,SELL} from'../../../common/const';

  import {
    // 返回顶部按钮
    backToTopMixin,
    // 商品图片加载监听器
    goodsItemImageListenerMixin
  } from "../../../common/mixin";


  export default {
    name: "TabContent",
    components:{
      // 封装的better-scroll的滚动组件
      Scroll,
      // 分类标签页分类子标签内容
      TabContentCategory,
      // 分类标签页子标签对应的商品内容
      TabContentDatail,
      // 标题选择器，及商品的类型选择器，’流行‘、‘新款’、‘热卖’
      TabControl
    },
    props:{
      // 分类标签页对应的子标签
      subcategory:{
        type:Object,
        default(){
          return {}
        }
      },

      // 分类标签页对应的商品数据
      categoryDetail:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        // 商品类型选择器
        titles:['流行','新款','精选'],
        currentTitleEng:'pop',

        // 控制吸顶的tabControl是否显示
        isToggleTabControlShow:false,

        // tabControl的offsetTop值
        tabControlOffsetTop:0,

        // 页面滚动的距离
        currentScrollY:0,
      }
    },

    // 返回顶部按钮
    mixins:[
      backToTopMixin,
      goodsItemImageListenerMixin
    ],

    methods:{
      /*
       1.监听商品类型选择器的点击
      （1）商品类型选择器被点击后，将当前的商品类型切换成被点击的tab的商品类型，即switch
      （2）抛出事件tabControlClick，让Category组件监听到该事件，并更新Category组件中currentType的值，让其刷新当前tabControl对应type的商品内容
      （3）防止滑动边界tabControl被点击的title显示不一致，让隐藏的tabControl和显示的tabControl的下标相等
      （4）若tabControl是处于吸顶状态的，则当tab被点击时，让页面滚动到该Tab第一个商品的位置
      */

      tabControlClick(index){
        switch(index){
          case 0:
            // 流行
            this.currentTitleEng=POP;
            break;
          case 1:
            // 新款
            this.currentTitleEng=NEW;
            break;
          case 2:
            // 热卖
            this.currentTitleEng=SELL;
            break;
        }

        // 抛出事件tabControlClick让Category组件监听到，让Category组件刷新tabControl对应type的商品内容
        this.$emit('tabControlClick',this.currentTitleEng)

        // 防止滑动边界tabControl被点击的title显示不一致，让隐藏的tabControl和显示的tabControl的下标相等
        this.$refs.tabcontrol.currentIndex=index
        this.$refs.toggletabcontrol.currentIndex=index

        // 切换title时滚动到该title的第一个商品的位置
        if(this.isToggleTabControlShow){
          if(this.currentScrollY>this.tabControlOffsetTop){
            this.$refs.scroll.scrollTo(0,-this.tabControlOffsetTop,300);
          }
        }
      },

      /*
        2.监听子分类标签和其对应的商品内容的滚动
      （1）用categoryContentScroll方法接收scroll组件发射出来的scroll事件，
      并将其发射出来的参数position作为混入好的返回顶部按钮getBackToTopShow方法的参数，让其决定返回顶部按钮是否显示
      （2）比较页面滚动的距离-position.y与tabControl距离顶部的位置，若滚动距离-position.y大于tabControlOffsetTop值，
      isToggleTabControlShow为真，则隐藏的tabControl显示，达到吸顶效果
      （3）记录当前页面滚动的距离，用变量currentScrollY保存
      */
      categoryContentScroll(position){
        // backToTopMixin中封装的决定返回顶部按钮是否显示的方法getBackToTopShow
        this.getBackToTopShow(position)

        // 当我们滚动的距离超过tabControl距离顶部的距离时，isToggleControlShow为真，显示吸顶效果
        this.isToggleTabControlShow=-position.y>this.tabControlOffsetTop;

        // 将滚动的距离赋值给定义的变量currentScrollY
        this.currentScrollY=-position.y;
      },

      /*
        3.监听分类子标签中的图片是否加载完成了，
      (1)每次接收到TabContentCategory组件中发射出来的子分类标签加载完成的事件时，对页面进行刷新操作
      (2)若全部照片都加载完成，则可以进行计算tabControl的offsetTop值，以完成吸顶效果
      */
      catetegoryImageLoad(){
        this.$refs.scroll.refresh();
        // 计算tabControl此时的offsetTop值
        this.tabControlOffsetTop=this.$refs.tabcontrol.$el.offsetTop
      },
    }
  }
</script>

<style scoped>

  .tabContent{
    width:80%;
    /*使用绝对定位，将可滚动的区域限定为除navbar和tabbar区域，不用设置特定的高度*/
    position:absolute;
    right:0;
    top:44px;
    bottom:49px;
  }

  .tabControl{
    font-size: 13px;
    background: var(--color-tint);
    color:#fff;
    border-radius: 10px;
  }

  .tabControlHidden{
    background:#fff;
    border-radius: 0;
  }

  /*吸顶的tabControl样式*/
  .toggletabcontrol {
    width:80%;
    position: relative;
    margin-left:20vw;
    color:#000;
    border-radius: 0;

    /*z-index属性只有在有定位position时才会生效*/
    z-index: 9;
    /*防止背景透明*/
    background: #fff;
  }
</style>
