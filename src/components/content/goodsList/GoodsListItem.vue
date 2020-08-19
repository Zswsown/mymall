<template>
  <div class="goodsListItem" @click="goodsItemClick">
    <!--    商品照片-->
    <!--    图片懒加载用v-lazy指向图片的地址-->
    <img v-lazy="getGoodsItemImage" alt="" @load="imageLoad">
    <div class="goodsListItemInfo">
      <!--      商品的标题-->
      <p class="title">{{goodsItem.title}}</p>
      <!--      商品的价格-->
      <span class="price">￥{{goodsItem.price}}</span>
      <!--      商品的收藏数-->
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return{
        // 商品id
        goodsItemID:null,
      }
    },
    computed:{
      // 得到商品的照片地址
      getGoodsItemImage(){
        if(this.goodsItem){
          // console.log(this.goodsItem)
          return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img;
        }
      }
    },
    methods:{
      /*监听图片是否加载完成，完成的话则向事件总线发出图片加载完成的事件itemImageLoad
      * 因为首页跟详情页都有关于图片加载不同步导致页面不可以滚动的问题，所以在Home组件和Detail中都要监听商品图片加载完成后发出的itemImageLoad事件
      * 但如果单独在GoodsItem组件中配置抛出事件和在Detail组件和Home组件中配置监听事件，没有特定区分的话，会导致在某个组件中监听该事件的同时，另外一个组件也在同时监听该事件
      *
      * 这里有两种解决方法：
      * （1）在配置抛出事件时，我们先做区分，
      * 当路由在Detail组件上时，则抛出detailItemImageLoad事件；
      * 当路由在Home组件上时，则向HomeItemImageLoad事件，各自组件进行监听抛出的特定事件
      *
      * 代码如下：
      * imageLoad(){
      *   if(this.$route.path.indexOf('/home')){
      *     this.$bus.$emit('homeItemImageLoad');
      *   }
      *   else if(this.$route.path.indexOf('/detail')){
      *     this.$bus.$emit('detailItemImageLoad');
      *   }
      * }
      *
      * (2)抛出同一个事件，然后在各自组件中进行监听，当用户切换界面时，注销掉离开页面的事件总线的监听事件，此时最关键的是怎样注销掉组件上关于事件总线的监听事件
      * 1)在离开Home组件时，我们可以在deactived()方法中注销掉先前注册的监听页面中商品图片加载的函数
      * 2)在离开Detail组件时，因为我们在<keep-alive exclude="Detail"><keep-alive>上声明了不保留Detail组件，
      * 所以在离开Detail组件时，是没有deactived函数调用的，只能调用destroy()函数，在该函数中注销掉先前注册的监听页面中商品图片加载的函数
      * 3)调用的监听页面中商品图片加载的函数可以是一样的（此时可用防抖），我们可以利用混入mixin对其进行混入，混入是针对对象的，继承是针对类的
      *
      * Home组件:
      *
      * data(){
      *   return{
      *     监听时调用的函数，先赋值为空
      *     itemImageLoad:null
      *   }
      * }
      *
      * mounted:{
      *   滚动页面刷新函数
      *   let refresh=this.debounce(this.$refs.homescroll.refresh,200)
      *   给调用的函数赋值
      *   this.itemImageLoad=()=>{
      *     refresh()
      *   }
      *   接收发送出来的事件
      *   this.$bus.$on('itemImageLoad',this.itemImageLoad)
      * }
      *
      * deactived{
      *   页面未被激活时注销掉该全局监听事件
      *   this.$bus.$off('itemImageLoad',this.itemImageLoad)
      * }
      *
      * Detail组件：
      *
      * data(){
      *   return{
      *     itemImageLoad:null
      *   }
      * }
      *
      * mounted:{
      *   let refresh=this.debounce(this.$refs.detailscroll.refresh,200)
      *   this.itemImageLoad=()=>{
      *     refresh()
      *   }
      *   this.$bus.$on('itemImageLoad',this.itemImageLoad)
      * }
      *
      * 注意这里是销毁函数
      * destroyed(){
      *   this.$bus.$off('itemImageLoad',this.itemImageLoad)
      * }
      * */
      imageLoad(){
        this.$bus.$emit('itemImageLoad')
      },

      /*监听商品被点击，发出事件时包含商品的iid
      * 当在详情页中点击推荐的商品数据时，虽然参数id改变了，但页面不会进行刷新，因为组件复用的问题
      * 解决该问题的两种方法：
      * (1)利用watch监听路由参数的变化，并对路由变化作出响应
      * (2)利用beforeRouteUpdate 导航守卫，在路由刷新前作出响应
      * (3)直接在<router-view :key="$route.fullPath"></router-view>动态绑定key属性，key属性值为路由配置的完整路径，这种方法性能消耗高
      */
      goodsItemClick(){
        this.goodsItemID=this.goodsItem.iid||this.goodsItem.item_id
        this.$router.push('/detail/'+ this.goodsItemID);
      }
    },

  }
</script>

<style scoped>
  .goodsListItem{
    /*相对定位，让下面的信息能以固定定位固定在该图片的下面*/
    position:relative;
    /*预留给下面信息的位置*/
    padding-bottom:40px;
  }
  .goodsListItem img{
    width:100%;
    border-radius: 5px;
  }

  /*商品图片下面的信息容器*/
  .goodsListItemInfo{
    position:absolute;
    left:0;
    right:0;
    bottom:5px;

    font-size:12px;
    text-align: center;

    overflow:hidden;
  }

  /*商品的title信息*/
  .goodsListItemInfo p{
    /*单行显示省略号*/
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

    margin:0 0 3px 1px;
  }

  /*商品价格*/
  .goodsListItemInfo .price{
    /*文字高亮*/
    color:var(--color-high-text);
    /*偏移过来，让收藏的五角星小图标有足够的位置存放*/
    margin-right:20px;
  }

  /*商品收藏数*/
  .goodsListItemInfo .cfav{
    position:relative;
  }

  /*商品收藏数前的五角星小图标*/
  .goodsListItemInfo .cfav::before{
    content:'';

    position:absolute;
    left:-15px;
    top:-1px;

    width:14px;
    height:14px;
    background: url("../../../assets/images/common/collect.svg") 0 0/14px 14px;
  }
</style>
