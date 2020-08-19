<template>
    <div id="detailSwiper">
      <swiper class="detailSwiper">
        <swiper-item v-for="(item,index) in detailSwiperImages" :key="index">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>
    </div>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'

  export default {
    name: "DetailSwiper",
    props:{
      detailSwiperImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detailSwiper{
    height: 300px;
    overflow: hidden;
  }
</style>
