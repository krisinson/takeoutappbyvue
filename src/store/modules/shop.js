

import Vue from 'vue'
import {
  SAVE_SHOPDATAS,
  ADD_FOOD_COUNT,
  DEL_FOOD_COUNT,
  CLEAR_CART,
  SAVE_SHOPSCART
} from '../mutation-types'
import { getShopDatas } from '../../api'

const state = {
  shopDatas: {}, //初始化商家数据
  shopsCart:[] 
}

const actions = {
  async getShopDatasAction({ commit }) {
    let result = await getShopDatas()
    if (result.code === 0) {
      commit(SAVE_SHOPDATAS, { shopDatas: result.data })
    }
  }

}
const mutations = {
  [SAVE_SHOPDATAS](state, { shopDatas }) {
    state.shopDatas = shopDatas
  },
  [SAVE_SHOPSCART](state,{ shopsCart }){
    state.shopsCart = shopsCart
  },
  [ADD_FOOD_COUNT](state, { food }) {
    if (food.count) {
      food.count++
    } else {
      // 使用添加响应式属性 以避免添加非响应式属性造成页面不更新
      Vue.set(food, 'count', 1)
      // 添加至购物车
      state.shopsCart.push(food)
    }
  },
  [DEL_FOOD_COUNT](state, { food }) {
    if (food.count) {
      food.count--
      if(!food.count){
        // 从购物车删除商品
        state.shopsCart.slice(state.shopsCart.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    state.shopsCart.forEach(food => food.count = 0)
    state.shopsCart = []
  }

}



const getters = {
  // 计算总数量
  totalCount(state){
    return state.shopsCart.reduce((pre,food)=>{
      return pre += food.count
    },0)
  },
  // 计算总价格
  totalPrice(state){
    return state.shopsCart.reduce((pre,food)=>{
      return pre+=food.count * food.price

    },0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}