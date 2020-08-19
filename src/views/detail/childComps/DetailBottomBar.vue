<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToShopcart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
    methods: {
      addToShopcart() {
        this.$emit('addToShopcart')
      }
    }
	}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:9;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 12px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 2px;
    background: url("../../../assets/images/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -52px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
  }

  .bar-right .cart {
    margin:5px 0;
    line-height: 39px;
    border-radius:10px 0 0 10px;
    background-color: #fe9402;
  }

  .bar-right .buy {
    margin:5px 5px 5px 0;
    line-height: 39px;
    border-radius:0 10px 10px 0;
    background-color: #f69;
  }
</style>
