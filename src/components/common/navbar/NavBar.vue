<template>
    <div class="navbar">
      <div class="nav-left"><slot name="nav-left"></slot></div>
      <div class="nav-center"><slot name="nav-center"></slot></div>
      <div class="nav-right"><slot name="nav-right"></slot></div>
    </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .navbar{
    display: flex;
    height:44px;
    line-height:44px;
    text-align:center;

    /*设置定位*/
    position:relative;
    z-index:99;

    /*原生滚动时我们才需要设置其fixed和层级z-index,因为我们封装了better-scroll组件，scroll组件滚动的距离已经固定好了，我们可以不用设置该定位*/
    /*position:fixed;*/
    /*top:0;*/
    /*left:0;*/
    /*right:0;*/
    /*z-index:9;*/
  }

  /*左插槽，可用于做返回标签*/
  .nav-left{
    width:60px;
  }

  /*右插槽，可用于做多选项*/
  .nav-right{
    width:60px;
  }

  /*中间插槽，可用于容纳内容，如标题等*/
  .nav-center{
    flex:1;
  }
</style>
