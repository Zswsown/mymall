<template>
  <div class="userOrdersItem">
    <div class="itemImage"><img :src="itemImage" alt=""></div>
    <div class="itemTitle">{{itemTitle}}</div>
  </div>

</template>

<script>
  export default {
    name: "UserOrdersItem",
    props:{
      itemImage:{
        type:String,
        default(){
          return "../../../../assets/images/profiles/daifukuan.svg"
        }
      },
      itemTitle:{
        type:String,
        default(){
          return "待付款"
        }
      }
    }
  }
</script>

<style scoped>
  .userOrdersItem{
    width: 14vw;
    height:14vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .itemImage{
    width: 10vw;
    height: 10vw;
  }

  .itemImage img{
    width: 100%;
    height: 100%;
  }

  .itemTitle{
    font-size: 13px;
    color: #000;
  }
</style>
