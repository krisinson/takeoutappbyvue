


import {SAVE_SHOPDATAS} from '../mutation-types'
import {getShopDatas} from '../../api'

const state = {
  shopDatas:{} //初始化商家数据
}

const mutations = {
[SAVE_SHOPDATAS](state,{shopDatas}){
  state.shopDatas=shopDatas
}

}

const actions = {
  async getShopDatasAction({commit}){
    let result = await getShopDatas()
    if(result.code===0){
      commit(SAVE_SHOPDATAS,{shopDatas:result.data})
    }
  }

}

const getters = {


}

export default {
  state,
  mutations,
  actions,
  getters
}