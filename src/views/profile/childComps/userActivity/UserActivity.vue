<template>
  <div class="userActivity">
    <user-activity-item v-for="(item,index) in userActivity"
                        :item-text="item.itemText"
                        :item-title="item.itemTitle"
                        :item-image="item.itemImage"></user-activity-item>
  </div>
</template>

<script>
  import UserActivityItem from "./UserActivityItem";
  export default {
    name: "UserActivity",
    components:{
      UserActivityItem
    },
    props:{
      userActivity:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .userActivity{
    height:10vh;
    width:96vw;

    padding: 0 1vw;
    margin: 1vh 2vw;
    z-index:1;

    color: #000;
    background: #fff;
    border-radius: 2vw;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
