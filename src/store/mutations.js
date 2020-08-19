import {
  Add_GOOD_COUNT,
  ADD_TO_SHOPCART,
  DELETE_GOOD,
  DECREASE_GOOD_COUNT,
  INCREASE_GOOD_COUNT
} from "./mutations-type";
// mutations中的每个方法都尽可能的简单一点，便于在vue.devtool中进行跟踪
export const mutations={
  // 商品数量加1
  [Add_GOOD_COUNT](state,payload){
    payload.count++;
  },

  // 将商品添加进购物车
  [ADD_TO_SHOPCART](state,payload){
    // 在加入购物车时默认其为被选中
    payload.checked=true;
    state.shopcartList.push(payload);
  },

  // 将商品移除购物车
  [DELETE_GOOD](state,payload){
    for(let i of payload){
      for(let j=0;j<state.shopcartList.length;j++){
        if(i.iid===state.shopcartList[j].iid){
          state.shopcartList.splice(j,1);
        }
      }
    }
  },

  // 购物车中的商品数量减1
  [DECREASE_GOOD_COUNT](state,payload){
    // console.log('--');
    state.shopcartList.find(item=>item.iid===payload.iid).count--;
  },

  // 购物车中的商品数量加1
  [INCREASE_GOOD_COUNT](state,payload){
    // console.log('++');
    state.shopcartList.find(item=>item.iid===payload.iid).count++;
  }
}

