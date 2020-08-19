<template>
  <!--  v-show适合于频繁切换，v-if适合于单次切换-->
  <div class="tabbar-item" @click="itemClick">
    <!--    未点击时的icon-->
    <div class="item-icon" v-show="!isActive">
      <slot name="icon"></slot>
    </div>

    <!--    点击时显示的icon-->
    <div class="item-active-icon" v-show="isActive">
      <slot name="active-icon"></slot>
    </div>

    <!--    tabbar标题文字-->
    <div class="item-text" :style="activeStyle">
      <slot name="icon-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabbarItem",
    props:{
      // tabbar被点击时相对应传进来的path路径
      path:{
        //必须传值
        require:true,
        type:String
      }
    },
    computed:{
      // 将路由配置中的所有path与当前传进来的path对比，若有当前传进来的path,则该icon切换成高亮icon
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1;
      },
      // 若isActive为真，则该icon下文字也显示为高亮
      activeStyle(){
        return this.isActive?'color:#ff5777':'';
      }
    },
    methods:{
      // 当icon被点击时，将路由的路径替换为当前传进来的path,replace不可后退
      itemClick(){
        return this.$router.replace(this.path);
      }
    }
  }
</script>

<style scoped>
  /*每个tabbar-item平分一份*/
  .tabbar-item{
    flex:1;
  }

  /*icon图标，active-icon图标*/
  .item-icon img,.item-active-icon img{
    height:24px;
    width:24px;
    margin-top:4px;
    /*图片底边会有白边，设置vertical-align会避免这种情况*/
    vertical-align: middle;
  }

  /*tabbar文字*/
  .item-text{
    font-size: 11px;
    margin-top: 2px;
    color: #333;
  }
</style>
