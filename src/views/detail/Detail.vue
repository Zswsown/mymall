<template>
  <div id="detail">
    <!--      详情页导航栏-->
    <detail-nav-bar ref="detailnavbar" @detailTitleClick="detailTitleClick"></detail-nav-bar>

    <scroll class="detailScroll" ref="scroll" @scroll="detailScroll" :probe-type="3">

      <!--    将得到的商品的轮播图的照片传入封装好的DetailSwiper组件中，让轮播图进行轮播-->
      <detail-swiper :detail-swiper-images="detailSwiperImages"></detail-swiper>

      <!--      详情页商品的主要信息-->
      <detail-base-info :goods="goods"></detail-base-info>

      <!--      详情页的店铺数据-->
      <detail-shop-info ref="shop" :shop="shop"></detail-shop-info>

      <!--      详情页商品的详情信息-->
      <detail-goods-info ref="detailInfo"
                         :detail-info="detailInfo"
                         @detailGoodsItemImageLoad="detailGoodsItemImageLoad"></detail-goods-info>

      <!--      详情页商品的参数信息-->
      <detail-param-info ref="paramInfo"
                         :param-info="paramInfo"></detail-param-info>

      <!--      详情页商品的评论信息-->
      <detail-comment-info ref="commentInfo"
                           :comment-info="commentInfo"></detail-comment-info>

      <!--      详情页商品的推荐商品列表-->
      <detail-recommend-info ref="recommend"
                             :recommend-list="recommendList"></detail-recommend-info>
    </scroll>

    <back-to-top @click.native="backToTop"
                 v-show="isShowBackToTop"></back-to-top>

    <detail-bottom-bar @addToShopcart="addToShopcart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  import {
    goodsItemImageListenerMixin,
    backToTopMixin
  } from '../../common/mixin'

  import {debounce} from "../../common/utils";

  import {
    getGoodsItemDetail,
    getRecommend,
    Goods,
    Shop,
    GoodsParam,
  } from "../../network/detail"

  export default {
    name: "Detail",
    components:{
      // 详情页的标题栏
      DetailNavBar,

      // 详情页商品轮播图
      DetailSwiper,

      // 详情页商品的主要信息
      DetailBaseInfo,

      // 详情页店铺信息
      DetailShopInfo,

      // 详情页商品的详情数据
      DetailGoodsInfo,

      // 详情页商品参数信息
      DetailParamInfo,

      // 详情页商品评论数据
      DetailCommentInfo,

      // 详情页推荐商品
      DetailRecommendInfo,

      // 详情页底部加入购物车栏
      DetailBottomBar,

      // 封装的better-scroll组件
      Scroll,
    },

    // 混入，将对象中共同的东西抽取出来，如商品照片监听器
    mixins:[
      // 商品照片加载监听器
      goodsItemImageListenerMixin,
      // 返回顶部按钮
      backToTopMixin
    ],

    data(){
      return{
        // 详情页商品图片数组
        detailSwiperImages:[],

        // 用来保存商品的主要数据，如旧价格、新价格等
        goods:{},

        // 用来保存店铺的主要数据，如店铺名称等
        shop:{},

        // 用来保存商品的详情数据
        detailInfo:{},

        //用来保存商品的参数信息
        paramInfo:{},

        // 用来保存商品的评论信息
        commentInfo:{},

        // 用来保存该商品的推荐商品列表
        recommendList:[],

        // 用来保存navBar中相应标题对应的容器 距离顶部的位置
        navTitleContentOffsetTop:[],

        // 防抖函数，用于获取 navBar中相应标题对应的容器 距离顶部的位置
        getTitleOffsetTop:null,

        // 实时记录当前滚动所处的位置
        scrollPositionY:0,

        // 当前滚动时navBar中title的应该保持的下标值
        currentNavIndex:0
      }
    },

    created() {
      // 1.得到该商品的iid
      this.iid=this.$route.params.iid;

      // 2.请求关于该商品的数据
      this._getGoodsItemDetail()

      // 3.获取详情页的推荐商品数据
      this._getRecommend()

      /*
        navBar中title的联动效果（第一步）
      * 要实现点击title后，页面滚动到title对应的位置的效果
      * 我们首先要监听navBar上title的点击，让title被点击时传出其相应的index
      * 然后在页面中取到各title对应的容器距离顶部的offsetTop值，保存在一个数组中，用index与title对应的offsetTop值对应
      * 然后用this.$refs.scroll.scrollTo(0,array[index],100)滚动到相应的位置
      *
      * 其中最重要的问题是怎么取到正确的offsetTop值，我们在每张图片加载完成时调用取offsetTop值的函数，
      * 并对其进行防抖操作，最后会取到正确的offsetTop值
      * */

      // 4.防抖函数，用于获取navBar中相应标题对应的容器 距离顶部的位置
      this.getTitleOffsetTop=debounce(()=>{
        this.navTitleContentOffsetTop=[]
        this.navTitleContentOffsetTop.push(0);
        this.navTitleContentOffsetTop.push(this.$refs.detailInfo.$el.offsetTop)
        this.navTitleContentOffsetTop.push(this.$refs.commentInfo.$el.offsetTop)
        this.navTitleContentOffsetTop.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.navTitleContentOffsetTop);
      },100)
    },

    mounted() {
    },

    // 当离开页面时注销掉该全局监听函数
    destroyed() {
      this.$bus.$off('itemImageLoad',this.goodsItemImageLoad)
    },

    methods:{
      // 1.请求关于该商品的数据
      _getGoodsItemDetail(){
        getGoodsItemDetail(this.iid).then(res=>{
          // console.log(res)
          // (1)取到请求到的数据
          const data=res.data.result

          // (2)获取商品详情页轮播图的照片
          this.detailSwiperImages=data.itemInfo.topImages;

          // (3)获取商品的主要信息
          // 实例化一个商品Goods对象，便于我们从复杂的请求数据中只取到我们需要的商品数据，并将其保存起来
          this.goods=new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // (4)获取店铺的信息
          // 实例化一个店铺Shop对象，便于我们从复杂的请求数据中只取到我们需要的店铺数据，并将其保存起来
          this.shop=new Shop(data.shopInfo)

          // (5)获取商品详情的信息
          this.detailInfo=data.detailInfo

          // (6)获取商品的参数信息
          this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

          // (7)获取商品的评论信息
          if(data.rate.list){
            this.commentInfo=data.rate.list[0];
          }
        })
      },

      // 2.获取详情页的推荐商品数据
      _getRecommend(){
        //（1）请求该商品的推荐商品列表，用recommendList进行保存
        getRecommend().then((res,error)=>{
          if(error) return;
          this.recommendList=res.data.data.list;
        })
      },

      // 3.监听详情页中商品详情数据中照片的加载，对scroll组件进行刷新，避免页面scrollHeight计算错误导致页面不可以滚动
      detailGoodsItemImageLoad(){
        /*
        这里的refresh()函数是被混入到mixin中了，防抖函数要在闭包中才能生效，
        mounted()只会被执行一次，所以调用的refresh函数只会被调用一次，即debounce被调用一次，但debounce里面的function会被调用多次
        如果单纯在这里以let refresh = debounce(this.$refs.scroll.refresh,200)设置防抖函数，
        则会导致每次调用时refresh都是新生成的，不能达到防抖的需求
        */
        this.refresh();

        // 取各title对应的容器距离顶部的offsetTop值
        this.getTitleOffsetTop();
      },

      // 4.点击navBar中的title时，会滚动到title对应的容器的位置
      detailTitleClick(index){
        this.$refs.scroll.scrollTo(0,-this.navTitleContentOffsetTop[index],150)
      },

     /*navBar中title的联动效果（第二步）
     * 监听scroll组件滚动时的scroll事件，并用变量scrollPositionY保存当前滚动的位置-position.y
     * 然后将该变量与第一步得到的各title对应的容器所在的位置offsetTop值进行比较，得到是否要更新处于高亮的title
     *
     * 注意：
     * （1）scrollPositionY可能为负值，因为可能会有上拉操作
     * （2）要注意下标i不要越界
     * */

      // 5.实时记录当前滚动所处的位置，并保存在一个变量中scrollPositionY,注意该变量有可能为负值，因为可能会有上拉操作
      detailScroll(position){
        // （1）调用混入中的backToTopMixin的getBackToTopShow(),决定返回顶部的按钮是否显示,注意显示的层级，有可能是z-index搞的鬼
        this.getBackToTopShow(position);

        // （2）记录当前页面滚动的位置，用scrollPositionY进行保存
        this.scrollPositionY=-position.y;

        // （3）记录当前navBar中title的个数
        const length=this.navTitleContentOffsetTop.length;

        for(let i=0;i<length;i++){
          // （4）若当前记录的title下标与要联动的title的下标不一致时，才执行这一步操作，避免重复输出
          if(this.currentNavIndex!==i){
            // 上拉操作
            let judge1= (this.scrollPositionY<0)

            // 前面三者只需要比较滚动距离有没有包含在this.navTitleContentOffsetTop前后两个临界值中
            let judge2= (i<length-1 && this.scrollPositionY>=this.navTitleContentOffsetTop[i] && this.scrollPositionY<this.navTitleContentOffsetTop[i+1]);

            // 第四个如果采用上面的方法，数组下标会越界，所以当i等于length-1时，若滚动距离大于临界值，则可以让title的下标值改变为i
            let judge3= (i===length-1 && this.scrollPositionY>this.navTitleContentOffsetTop[i]);

            if(judge1){
              this.currentNavIndex=0;
              this.$refs.detailnavbar.currentIndex=this.currentNavIndex;
            }

            else if(judge2||judge3){
              this.currentNavIndex=i;
              this.$refs.detailnavbar.currentIndex=this.currentNavIndex;
            }
          }
        }
      },

      // 6.将商品添加进购物车
      addToShopcart(){
        // （1）获取购物车中需要展示的信息
        const good={};
        good.image=this.detailSwiperImages[0];
        good.title=this.goods.title;
        good.desc=this.goods.desc;
        good.price=this.goods.nowPrice;
        good.iid=this.iid;

        // （2）将商品添加到购物车里，将vuex中的actions方法中的addShopcart返回的promise对象进行回调，进行弹窗toast显示
        this.$store.dispatch('addShopcart',good).then(res=>{
          this.$toast.show(res,1000);
        });

        // 让购物车页面刷新，不然会出现购物车页面不可以滚动的情况
        this.$bus.$emit('shopcartScrollRefresh')
      }
    }
  }
</script>

<style scoped>
  .detailScroll{
    /*使用定位*/
    position:absolute;
    left:0;
    right:0;
    top:44px;
    bottom:49px;

    z-index:9;
    background: #fff;
  }
  .detailNavBar{
    background: #fff;
  }
</style>
