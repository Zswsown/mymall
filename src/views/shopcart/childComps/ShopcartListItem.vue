<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @checkBtnClick="checkedChange" v-model="shopcartGoodsItem.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="shopcartGoodsItem.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{shopcartGoodsItem.title}}</div>
      <div class="item-desc">
        <span>商品描述: {{shopcartGoodsItem.desc}}</span>
      </div>
      <div class="info-bottom">
        <div class="item-price">¥<span>{{shopcartGoodsItem.price}}</span></div>
        <div class="item-count" v-show="!isCountClick" @click="countClick">x{{shopcartGoodsItem.count}}</div>
        <!--        数量加减器，默认隐藏，当点击了数量的时候才会显示-->
        <div class="item-countHidden" v-show="isCountClick">
          <button class="decrease" @click="decrease">
            <span>-</span>
          </button>
          <span class="inputCount">{{shopcartGoodsItem.count}}</span>
          <button class="increase" @click="increase">
            <span>+</span>
          </button>
          <div class="cancleIcon" @click="countClick">
            <img src="../../../assets/images/common/cancel.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  export default {
    name: "ShopcartListItem",
    props:{
      shopcartGoodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return{
        // 默认商品数量没被点击，按钮式增减数量样式不显示
        isCountClick:false
      }
    },
    components: {
      CheckButton
    },
    // 当离开页面时，加减器默认隐藏
    deactivated() {
      this.isCountClick=false;
    },
    methods: {
      // 点击勾选按钮时进行取反
      checkedChange: function () {
        this.shopcartGoodsItem.checked = !this.shopcartGoodsItem.checked;
      },
      // 点击商品数量会显示商品数量加减器，点击取消按钮会恢复原来样式
      countClick(){
        this.isCountClick=!this.isCountClick;
      },
      // 商品数量减1
      decrease(){
        if(this.shopcartGoodsItem.count>1){
          this.$store.dispatch('decreaseGoodCount',this.shopcartGoodsItem);
        }
        else if(this.shopcartGoodsItem.count===1){
          document.getElementsByClassName('.decrease').disabled=true;
        }
      },
      // 商品数量加1
      increase(){
        if(this.shopcartGoodsItem.count===1){
          document.getElementsByClassName('.decrease').disabled=false;
        }
        this.$store.dispatch('increaseGoodCount',this.shopcartGoodsItem);
      },
      // 当离开购物车页面时，商品的删除图标都不显示
      shopcartItemDeleltIconShow(){
        this.isCountClick=false;
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 96%;
    background: #fff;
    border-radius: 3%;
    margin: 10px 2%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height:110px;

    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-title{
    height:20px;
    line-height: 20px;
    font-size: 16px;
    font-weight:600;
    color: #333;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-desc {
    font-size: 13px;
    color: #666;

    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .item-desc span{
    background: #eee;
    height: 22px;
    line-height: 22px;
    border-radius: 4px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .info-bottom {
    height:30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .item-price{
    font-size: 14px;
    color:#fa0034;
    font-weight:600;
  }

  .item-price span{
    font-size: 18px;
    color:#fa0034;
    font-weight:600;
  }

  .item-count{
    font-size: 15px;
    border: 1px solid #d3d3d3;
    padding: 2px;
    text-align: center;
    border-radius: 7px;
  }

  .item-countHidden{
    height:25px;
    display: flex;
  }

  .inputCount{
    width: 25px;
    height: 25px;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
    text-align: center;
    font-size: 14px;
    line-height: 25px;
  }

  .decrease,.increase{
    height:25px;
    width:25px;
    background: #fff;
    border:1px solid #eee;
    border-radius:10px 0 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .increase{
    justify-content: center;
    border-radius:0 10px 10px 0;
  }

  .cancleIcon{
    width: 25px;
    height: 25px;
    margin-left:2px;
  }

  .cancleIcon img{
    width: 100%;
    height:100%;
  }
</style>
