<template>
    <div class="shopcartList">
      <shopcart-list-item v-for="(item,index) in shopcartList" :key="index" :shopcartGoodsItem="item"></shopcart-list-item>
    </div>
</template>

<script>
  import ShopcartListItem from "./ShopcartListItem";
  export default {
    name: "ShopcartList",
    components:{
      ShopcartListItem,
    },
    props:{
      shopcartList:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
