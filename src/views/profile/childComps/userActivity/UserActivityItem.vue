<template>
  <div class="userActivityItem">
    <div class="itemInfo">
      <span class="itemTitle">{{itemTitle}}</span>
      <span class="itemText">{{itemText}}></span>
    </div>
    <div class="itemImage">
      <img :src="itemImage" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserActivityItem",
    props:{
      itemTitle:{
        type:String,
        default(){
          return "红包签到"
        }
      },
      itemText:{
        type:String,
        default() {
          return "领5元红包";
        }
      },
      itemImage:{
        type:String,
        default(){
          return "../../../assets/images/profile/hongbao.svg"
        }
      }
    }
  }
</script>

<style scoped>
  .userActivityItem{
    width: 30vw;
    height:10vh;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1vh 0;
  }

  .itemInfo{
    flex:1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .itemTitle{
    font-size: 15px;
    font-weight: 700;
  }

  .itemText{
    margin-top: 2px;
    font-size: 13px;
    /*color: #fa0034;*/
    color: #ce6c3a;
  }

  .itemImage{
    width: 10vw;
    height:10vw;
  }

  .itemImage img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
