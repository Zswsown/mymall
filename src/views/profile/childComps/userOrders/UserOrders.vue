<template>
  <div class="userOrders">
    <div class="userOrdersTitle">我的订单</div>
    <div class="userOrdersContent">
      <user-orders-item v-for="(item,index) in userOrders"
                        :item-image="item.itemImage"
                        :item-title="item.itemTitle"></user-orders-item>
    </div>
  </div>
</template>

<script>
  import UserOrdersItem from "./UserOrdersItem";
  export default {
    name: "UserOrders",
    components:{
      UserOrdersItem,
    },
    props:{
      userOrders:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .userOrders{
    margin: 1vh auto;
  }

  .userOrdersTitle{
    color: #333;
    font-size: 18px;
    font-weight: 700;
    margin:5px 2vw;
  }

  .userOrdersContent{
    height:12vh;
    width:96vw;

    padding: 0 1vw;
    margin: 0 2vw;
    z-index:1;

    color: #000;
    background: #fff;
    border-radius: 2vw;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
