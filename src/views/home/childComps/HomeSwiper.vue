<!--轮播图-->
<template>
    <swiper ref="swiper">
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <!--          homeSwiperImageLoad用来监听首页轮播图的照片是否加载完成了-->
          <img :src="item.image" alt="" @load="homeSwiperImageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    data(){
      return{
        // isFirstLoad属性用来判断是否是首次发出加载，是的话则发出事件
        isFirstLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{

      homeSwiperImageLoad(){
        // 因为轮播图有多张照片，而我们只需要知道轮播图照片加载出来时它的尺寸，所以第一张照片加载完成即可发出homeSwiperImageLoad事件通知Home组件，
        // isFirstLoad则是用来判断轮播图第一张照片是否加载完成，当第一张照片加载完成时将isFirstLoad赋值为true,阻止接下来加载好的照片再次发送事件
        // 当Home组件接收到该事件后则可以用来计算tabControl的offsetTop值，以期完成tabControl的吸顶效果
        if(!this.isFirstLoad){
          this.$emit('homeSwiperImageLoad')
          this.isFirstLoad=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
