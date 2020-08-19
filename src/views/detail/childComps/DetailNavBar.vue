<template>
    <div id="detailNavBar">
      <nav-bar class="detailNavBar">
        <!--        中间的标题-->
        <div slot="nav-center" class="detailTitles">
          <div v-for="(item,index) in titles"
               class="detailTitle"
               :class="{active:currentIndex===index}"
               @click="detailTitleClick(index)">
            {{item}}
          </div>
        </div>
        <!--        左边的返回按钮-->
        <div slot="nav-left"
             class="detailBackIcon"
             @click="detailBackIconClick">
          <img src="../../../assets/images/common/back.svg" alt="">
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','详情','评论','推荐'],
        currentIndex:0//默认第一个title文本高亮
      }
    },
    methods:{
      // 监听详情标题栏title的点击
      detailTitleClick(index){
        this.currentIndex=index;
        this.$emit('detailTitleClick',index)
      },

      // 监听返回按钮的点击
      detailBackIconClick(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .detailNavBar{
    background: #fff;
  }
  .detailTitles{
    display:flex;
  }
  .detailTitle{
    flex:1;
    font-size:13px;
  }
  .active{
    color:var(--color-high-text);
  }
  .detailBackIcon img{
    height:18px;
    width:18px;
    margin-top:13px;
  }
</style>
