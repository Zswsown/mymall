<template>
  <!--  用v-for遍历传进来的goodsList，将每一个item再传进子组件GoodsListItem中，进行需要展示的属性的绑定-->
  <div class="goodsList">
    <goods-list-item class="goodsItem"
                     v-for="(item,index) in goodsList"
                     :key="index"
                     :goodsItem="item"
                     @itemImageLoad="itemImageLoad"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "../../../components/content/goodsList/GoodsListItem";
  export default {
    name: "TabContentDatail",
    components:{
      GoodsListItem
    },
    props:{
      // 将指定title的商品传进该组件，用goodsList进行接收传进来的商品数组
      goodsList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      itemImageLoad(){
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .goodsList{
    display: flex;
    /*换行*/
    flex-wrap:wrap;
    /*平分剩余空间*/
    justify-content: space-around;
    /*微调，让中间的空隙不要太大*/
    margin: 0 2px;
  }

  .goodsItem{
    /*设置每个商品的宽度为38%*/
    width:48%;
    margin:10px auto;
  }
</style>
