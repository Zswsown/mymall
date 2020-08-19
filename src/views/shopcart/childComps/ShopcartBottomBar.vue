<template>
    <div id="shopcartBottomBar">
      <!--      在该全选按钮下监听商品列表中所有商品的选中状态，有一个商品没被选中，则全选按钮不选中，若商品全被选中，则全选按钮被选中-->
      <!--      注意这里CheckButton是组件，不可以直接监听点击事件，加上.native可以监听组件的点击事件-->
      <check-button class="checkAll" :value="isSelectAll" @click.native="selectAllClick"></check-button>

      <!--      显示总价格-->
      <div class="totalPrice" v-show="!isNavActive">
        <span class="totalPriceTitle">合计:</span>
        <!--        被选中商品总价-->
        <span class="totalPriceNum">{{totalPrice}}</span>
      </div>

      <!--      去计算-->
      <div class="countAll" @click="toCountAll" v-show="!isNavActive">
        <span class="countAllText">结算</span>
        <!--        被选中的商品的数量-->
        <span class="countAllNum" v-show="isCountAllNumShow">{{countAll}}</span>
      </div>

      <div class="delete" @click="deleteGoods" v-show="isNavActive">
        <span class="deleteText">删除</span>
        <!--        被选中的商品的数量-->
        <span class="countAllNum" v-show="isCountAllNumShow">{{countAll}}</span>
      </div>
    </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import { mapGetters } from 'vuex';
  export default {
    name: "ShopcartBottomBar",
    components:{
      // 全选按钮
      CheckButton
    },
    data(){
      return{
        // 当没有商品被选中时，去计算里面的括号和0不显示
        isCountAllNumShow:false,
        // 选中的要进行删除的商品列表
        deleteGoodsList:[]
      }
    },

    props:{
      // 判断navBar的管理按钮是否被点击，默认为未点击
      isNavActive:{
        type:Boolean,
        default(){
          return false;
        }
      }
    },

    computed:{
      ...mapGetters([
        'shopcartList'
      ]),

      // 1.计算被选中的商品的总价格
      // 先用过滤器fliter取出被选中的商品，然后用reduce计算被选中的商品的总价格，
      // toFixed(2)保留两位小数，因为js中的计算有精度问题
      totalPrice(){
        // (1)记录被选中的商品列表
        let tempCheckedGoods=this.shopcartList.filter(item => {return item.checked});
        if(tempCheckedGoods.length>0){
          // (2)计算被选中商品的总价
          let tempTotalPrice=tempCheckedGoods.reduce((preValue,item)=>{return preValue+item.count*item.price},0);
          return "￥"+tempTotalPrice.toFixed(2);
        }
        else{
          return "￥0";
        }
      },

      // 2.计算被选中的商品的数量
      countAll(){
        let tempLength=this.shopcartList.filter(item => {return item.checked}).length;
        // 长度为0，括号和0不显示
        if(tempLength===0){
          this.isCountAllNumShow=false;
        }
        else{
          this.isCountAllNumShow=true;
          return "("+tempLength+")";
        }
      },

      // 3.在该全选按钮下监听商品列表中所有商品的选中状态，有一个商品没被选中，则全选按钮不选中，若商品全被选中，则全选按钮被选中
      isSelectAll(){
        // 若没有商品，则全选按钮不被选中
        if(this.shopcartList.length===0){
          return false;
        }
        return !(this.shopcartList.filter(item=>!item.checked).length)
      },
    },
    methods:{
      // 全选按钮被点击，若先前全选按钮为选中，则之后的商品全为不选中，若先前的全选按钮为不选中，则之后的商品为不选中，
      // 注意这里取全选按钮的选中状态可以直接调用计算属性中的isSelectAll方法
      selectAllClick(){
        if(this.isSelectAll){
          this.shopcartList.forEach(item => item.checked=false);
        }
        else{
          this.shopcartList.forEach(item =>item.checked=true);
        }
      },

      //跳转页面，去计算
      toCountAll(){
        if(this.shopcartList.length===0){
          this.$toast.show('购物车为空',1000)
        }
        else if(!this.shopcartList.filter(item => item.checked).length){
          this.$toast.show('未选择购买商品',1000)
        }
        else{
          this.$toast.show('购买成功',1000)
        }
      },

      //删除选中的商品
      deleteGoods(){
        // （1）挑选出被选中的商品
        this.deleteGoodsList=this.shopcartList.filter(item=>item.checked)
        // （2）当被选中的商品的长度不为0时，将删除商品的事件发送至状态管理模式vuex的actions中的deleteGoods方法中，
        // deleteGoods方法会调用mutations中的deleteGood方法，去修改state中shopcart中的值，达到删除商品的目的
        if(this.deleteGoodsList.length!==0){
          this.$store.dispatch('deleteGoods',this.deleteGoodsList).then(res=>{
            // （3）弹窗显示删除商品成功
            this.$toast.show(res,300);
          })
        }
        // （4）若长度为0，则弹窗显示选择要删除的商品
        else{
          this.$toast.show('请先选择要删除的商品','300')
        }
      }
    }
  }
</script>

<style scoped>
  #shopcartBottomBar{
    height:40px;
    width:100%;

    position:fixed;
    left:0;
    right:0;
    bottom:49px;

    display:flex;
    justify-content: space-between;
    align-items: center;

    padding:0 3%;
    background: #fff;
  }

  .totalPrice{
    font-size:13px;
    flex:1;
    display: flex;
    justify-content: flex-end;
    margin: 0 2%;
  }

  .totalPriceTitle{
    color:#000;
    font-weight:700;
  }

  .totalPriceNum{
    color:var(--color-high-text);
  }

  .countAll{
    height:36px;
    width:80px;
    border-radius: 18px;

    font-size:13px;
    line-height:36px;

    background: var(--color-tint);
    color:#fff;

    text-align: center;
  }

  .delete{
    height:36px;
    width:80px;
    border-radius: 18px;

    font-size:13px;
    line-height:36px;

    background: #fa0034;
    color:#fff;

    text-align: center;
  }
</style>
