<template>
  <div class="userInfo">
    <div class="userImage">
      <img src="../../../../assets/images/profile/user.jpg" alt="">
    </div>
    <div class="info">
      <div class="userName">{{userName}}</div>
      <div class="userTitle"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    props:{
      userName:{
        type:String,
        default(){
          return "登录/注册"+">"
        }
      }
    }
  }
</script>

<style scoped>
  .userInfo{
    height:12vh;
    width:100vw;

    padding: 0 3vw;
    margin-top:2vh;
    z-index:1;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .userImage{
    width:10vh;
    height:10vh;
  }

  .userImage img{
    width: 100%;
    height:100%;
    border-radius:50%;
  }

  .info{
    flex:1;
    height:100%;
    padding: 1vh 2vw;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .userName{
    color: #fff;
    font-size: 17px;
    font-weight:700;
  }
</style>
