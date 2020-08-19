<template>
  <div class="userBehaviorItem">
    <div class="itemNum">{{itemNum}}</div>
    <div class="itemText">{{itemText}}</div>
  </div>
</template>

<script>
  export default {
    name: "UserBehaviorItem",
    props:{
      itemNum:{
        type:Number,
        default(){
          return 0
        }
      },
      itemText:{
        type:String,
        default(){
          return "收藏夹"
        }
      }
    }
  }
</script>

<style scoped>
  .userBehaviorItem{
    width: 10vh;
    height: 10vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .itemNum{
    font-weight: 700;
    font-size:20px;
  }

  .itemText{
    font-size:14px;
  }
</style>
