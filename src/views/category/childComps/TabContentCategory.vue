<template>
  <div id="tabContentCategory" v-if="subcategories.data">
    <div class="item" v-for="(item, index) in subcategories.data.list" :key="index">
      <a :href="item.link">
        <!--        监听图片加载，防止计算出的tabControl的值不正确，导致吸顶效果出错-->
        <img class="item-img" :src="item.image" alt="" @load="imageLoad">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

  export default {
    name: "TabContentCategory",

    props: {
      // 分类标签的子标签
      subcategories: {
        type: Object,
        default() {
          return []
        }
      }
    },

    methods:{
      // 监听图片加载，每一张图片加载完，都会向外发送一个事件，告诉外面它加载完成了
      imageLoad(){
        this.$emit('imageLoad');
      }
    }
  }
</script>

<style scoped>
  #tabContentCategory{
    display: flex;
    flex-wrap:wrap;
    padding:0 2vw;
  }

  .item{
    width:22vw;
    height:22vw;
    margin:10px auto;
    text-align: center;

    font-size: 12px;
    background: #fff;
    border-radius:10px;
    box-shadow: 2px 2px 2px 2px #f6f6f6;
  }

  .item-img {
    width: 70%;
  }

  .item-text {
    margin-top: 5px;
  }
</style>
