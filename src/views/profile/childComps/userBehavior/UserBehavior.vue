<template>
  <div class="userBehavior">
    <user-behavior-item v-for="(item,index) in userBehavior"
                        :item-num="item.itemNum"
                        :item-text="item.itemText"></user-behavior-item>
  </div>
</template>

<script>
  import UserBehaviorItem from "./UserBehaviorItem";
  export default {
    name: "UserBehavior",
    components:{
      UserBehaviorItem,
    },
    props:{
      userBehavior:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .userBehavior{
    height:10vh;
    width:100vw;

    padding: 0 3vw;
    z-index:1;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #fff;
  }
</style>
