<!--每日推荐-->
<template>
  <div id="homeRecommend">
    <div class="homeRecommendItem" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <!--        推荐栏的图片-->
        <img :src="item.image" alt="">
        <!--        推荐图片下的标题-->
        <div class="homeRecommendItemTitle">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #homeRecommend{
    display:flex;
    padding:10px 0 20px;

    text-align: center;

    font-size:14px;
    /*出现灰色分割线*/
    border-bottom:8px solid #eee;
  }
  .homeRecommendItem{
    flex:1;
  }
  .homeRecommendItem img{
    height:80px;
    width:80px;
  }
  .homeRecommendItemTitle{
    margin-top:5px;
  }
</style>
