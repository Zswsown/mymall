<template>
  <scroll class="tabMenuScroll">
    <div id="tabMenu">
      <div class="tabMenuItem"
           v-for="(item,index) in tabMenuContent"
           :class="{active:currentIndex===index}"
           @click="tabMenuItemClick(index)">{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll'

  export default {
    name: "TabMenu",
    props:{
      // 分类标签的内容
      tabMenuContent:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        // 分类页点击的分类标签，默认第一个标签被点击
        currentIndex:0
      }
    },
    components:{
      Scroll
    },
    methods:{
      // 监听分类标签点击事件
      // （1）改变被点击的分类标签的样式
      // （2）向分类Category组件发送该分类标签被点击的事件，告诉分类Category组件显示对应标签的数据
      // （3）向tabContent组件发送事件，告诉它要将页面滚动到顶端
      tabMenuItemClick(index){
        this.currentIndex=index
        this.$emit('tabMenuItemClick',index)
        // 利用事件总线将该事件传到tabContent中，让其tabContent组件中的scroll组件调用scroll方法，滚动到顶部
        this.$bus.$emit('tabMenuItemClick')
      }
    }
  }
</script>

<style scoped>
  .tabMenuScroll{
    width:20%;
    /*使用绝对定位，将可滚动的区域限定为除navbar和tabbar区域，不用设置特定的高度*/
    position:absolute;
    left:0;
    top:44px;
    bottom:49px;
  }

  #tabMenu{
    background: #f2f2f2;
    display: flex;
    flex-direction:column;
  }

  .tabMenuItem{
    /*因为设置了边框动画效果，为了防止点击时内容与其它分类标签比较起来发生移位，所以现在这里设置透明的边框*/
    border-left: 8px solid transparent;
    box-sizing: content-box;
    flex:1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
  }

  .active{
    border-left: 8px solid var(--color-tint);
    border-radius: 20px 0 0 20px;
    outline:none;

    color:#000;
    background: #fff;
    font-weight:bold;

    position:relative;
    transition: border-radius 1s;
    -webkit-transition:border-radius 1s;
  }
</style>
