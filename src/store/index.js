import Vue from 'vue'
import Vuex from 'vuex'

// 记得加中括号，对象、方法、常量得加括号
import {mutations} from './mutations'
import {actions} from './actions'
import {getters} from './getters'

// 1.安装Vuex
Vue.use(Vuex)

const state={
  // 购物车中的商品列表
  shopcartList:[]
}

// 2.创建store对象
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

// 3.挂载在Vue实例上
export default store
