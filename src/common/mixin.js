// 商品照片加载监听器
import {debounce} from './utils'
export const goodsItemImageListenerMixin={
  data(){
    return{
      // 处理图片加载完时发射出来的事件的函数
      goodsItemImageLoad:null,
      // 刷新函数
      refresh:null,
      // 滚动到顶部函数
      scrollToTop:null
    }
  },
  mounted(){
    // 1.(1)封装的better-scroll组件的刷新函数
    this.refresh=debounce(this.$refs.scroll.refresh,200)

    // (2)事件总线发射出的事件的处理函数
    this.goodsItemImageLoad=()=>{
      this.refresh()
    }

    // (3)当图片加载完时用该函数接收发射出来的事件itemImageLoad
    this.$bus.$on('itemImageLoad',this.goodsItemImageLoad)

    // 2.(1)当分类标签被点击时，要将tabContent组件的页面返回到顶部
    this.scrollToTop=()=>{
      this.$refs.scroll.scrollTo(0,0,300);
    }
    // (2)监听分类标签的点击，若分类标签被点击了，则用scrollToTop方法来接收事件总线发射出去的tabMenuClick事件
    this.$bus.$on('tabMenuItemClick',this.scrollToTop)
  }
}

// 返回顶部按钮的混入
import BackToTop from "../components/common/backtotop/BackToTop";
export const backToTopMixin={
  data(){
    return{
      // 滚动距离的临界值,在首页中该临界值用来判断返回顶部按钮是否显示
      criticalScrollY:1000,

      // 默认返回顶部的图标不显示
      isShowBackToTop:false
    }
  },
  components:{
    BackToTop
  },
  methods:{
    // 当返回顶部的按钮被点击后，利用ref="scroll"取到首页的滚动组件，
    // 调用封装好的better-scroll组件中data的scroll的scrollTo(x,y,duration)方法,令它滚动到顶部
    // 记得要用手指滑动，不要用鼠标直接滚动，不然返回顶部按钮不会生效
    backToTop(){
      this.$refs.scroll.scrollTo(0,0);
    },

    // 决定该返回顶部的图标是否显示
    // 为了决定返回顶部的图标是否显示，我们将决定是否显示图标的代码抽取出来，定义为一个函数，因为methods中只能抽取方法，不能抽取方法里面的内容，
    // 然后在调用该混入对象的组件中调用该函数即可达到同种功能
    getBackToTopShow(position){
      this.isShowBackToTop=-position.y>this.criticalScrollY;
    }
  }
}

// 标签选择器的混入
import {POP, NEW, SELL} from "./const";

export const tabControlMixin = {
  data: function () {
    return {
      // 默认当前类型为'pop'类型
      currentType: POP
    }
  },
  methods: {
    // 监听标签选择器的点击，若它被点击了，则更换当前的商品类型为点击的商品类型
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    }
  }
}
