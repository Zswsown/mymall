<template>
  <div id="profile">
    <!--    最底层的粉红色图层-->
    <div class="profileFloor"></div>
    <!--    用户信息-->
    <user-info></user-info>
    <!--    用户行为，如足迹等-->
    <user-behavior :user-behavior="userBehavior"></user-behavior>
    <!--    用户活动，如红包，礼品券-->
    <user-activity :user-activity="userActivity"></user-activity>
    <!--    用户订单-->
    <user-orders :user-orders="userOrders"></user-orders>
  </div>
</template>

<script>
  import UserInfo from "./childComps/userInfo/UserInfo";
  import UserBehavior from "./childComps/userBehavior/UserBehavior";
  import UserActivity from "./childComps/userActivity/UserActivity";
  import UserOrders from "./childComps/userOrders/UserOrders";
  export default {
    name: "Profile",
    components:{
      UserInfo,
      UserBehavior,
      UserActivity,
      UserOrders
    },
    data(){
      return{
        // 用户行为
        userBehavior:[
          {itemNum:0,itemText:'收藏夹'},
          {itemNum:0,itemText:'足迹'},
          {itemNum:0,itemText:'红包卡卷'},
          {itemNum:0,itemText:'积分'},
        ],
        // 用户活动
        userActivity:[
          {itemTitle: '红包签到',itemText:'领5元红包',itemImage:'../../../assets/images/profile/hongbao.svg'},
          {itemTitle: '优惠券',itemText: '积分领劵',itemImage:'../../../assets/images/profile/quan.svg'},
          {itemTitle: '私房礼品',itemText: '超值好礼',itemImage:'../../../assets/images/profile/gift.svg'}
        ],
        // 用户订单
        userOrders:[
          {itemTitle:'待付款',itemImage:'../../../../assets/images/profile/daifukuan.svg'},
          {itemTitle:'待发货',itemImage:'../../../../assets/images/profile/daifahuo.svg'},
          {itemTitle:'待收货',itemImage:'../../../../assets/images/profile/daishouhuo.svg'},
          {itemTitle:'待评价',itemImage:'../../../../assets/images/profile/pingjia.svg'},
          {itemTitle:'售后',itemImage:'../../../../assets/images/profile/shouhou.svg'}
        ]
      }
    }
  }
</script>

<style scoped>
  #profile{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f2f2f2;
    width: 100vw;
    height:100vh;
  }

  .profileFloor{
    width: 100vw;
    height:30vh;
    background:var(--color-tint);
    border-radius:0 0 8vw 8vw;

    position:absolute;
    left:0;
    right:0;
    top:0;
  }
</style>
