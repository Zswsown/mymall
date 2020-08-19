<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
  .tabbar{
    /*样式*/
    background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid #eee;
    box-shadow: 0px -1px 1px rgba(150,150,150,.08);

    /*定位*/
    position:fixed;
    bottom:0;
    left:0;
    right:0;

    /*布局*/
    display:flex;
    text-align: center;
  }
</style>
