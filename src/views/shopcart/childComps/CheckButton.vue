<template>
    <div>
      <!--      动态绑定属性，当按钮被选中时，按钮为打钩-->
      <div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">
        <img src="../../../assets/images/shopcart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  // 默认按钮为不选中
		  value: {
		    type: Boolean,
        default: false
      }
    },
    data(){
		  return{
		    // 选中状态为模型中个商品中的checked属性的值决定的
        checked: this.value
      }
    },
    methods: {
		  // 当按钮被点击时，发出该按钮被点击的事件
      selectItem(){
        this.$emit('checkBtnClick')
      }
    },
    watch: {
		  // 动态监听value值的变化，将新的newValue值赋予value
		  value: function (newValue) {
        this.checked = newValue;
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
