<template>
    <div class="backToTop">
      <img src="../../../assets/images/common/top.png" alt="">
    </div>
</template>

<script>
  export default {
    name: "BackToTop"
  }
</script>

<style scoped>
  .backToTop{
    position:fixed;
    right:2px;
    bottom:50px;
    z-index: 9;
  }
  .backToTop img{
    height:43px;
    width:43px;
  }
</style>
