export const getters={
  // 得到购物车商品的数量
  shopcartListLength(state){
    return state.shopcartList.length
  },
  // 得到购物车商品列表
  shopcartList(state){
    return state.shopcartList
  }
}
