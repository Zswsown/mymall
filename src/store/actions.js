import {
  Add_GOOD_COUNT,
  ADD_TO_SHOPCART,
  DELETE_GOOD,
  DECREASE_GOOD_COUNT,
  INCREASE_GOOD_COUNT
} from "./mutations-type";

export const actions={
  // 1.将商品添加进购物车前进行的判断工作
  addShopcart(context,payload){
    // 若向vuex发送了某个操作，想要在外面监听到vuex接收到该操作后返回的数据，可以用一个promise对象来进行封装
    return new Promise((resolve,reject)=>{
      // （1）查找购物车中有无该添加进来的商品，保存在变量oldgood中
      let oldgood=context.state.shopcartList.find(item => item.iid === payload.iid);
      // （2）若oldgood不为空，则将其派发至mutations中的addGoodCount方法中，进行商品数量加1
      if(oldgood){
        context.commit(Add_GOOD_COUNT,oldgood);
        resolve('成功加入购物车')
      }else{
        //（3）若oldgood为空，则将其派发至mutations中的addToShopcart方法中，添加进购物车商品列表中
        payload.count=1;
        context.commit(ADD_TO_SHOPCART,payload)
        resolve('成功加入购物车')
      }
    })
  },
  // 删除购物车的商品
  deleteGoods(context,payload){
    return new Promise((resolve,reject)=>{
      context.commit(DELETE_GOOD,payload)
      resolve('删除成功')
    })
  },
  // 减少购物车中商品的数量
  decreaseGoodCount(context,payload){
    context.commit(DECREASE_GOOD_COUNT,payload)
  },
  // 增加购物车中商品的数量
  increaseGoodCount(context,payload){
    context.commit(INCREASE_GOOD_COUNT,payload)
  }
}
