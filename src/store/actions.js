/* 
包含多个间接更新状态数据方法的action对象
*/
import {
    SAVE_ADDRESS,
    SAVE_CATEGORY,
    SAVE_SHOPS,
    SAVE_TOKEN,
    SAVE_USER
} from './mutation-types'
import { getAddress, getCategories, getShops, autoLogin } from '../api'

export default {
    async getAddressAction({ commit }) {
        let result = await getAddress(42.10038, 110.86867)
        if (result.code === 0) {
            commit(SAVE_ADDRESS, { address: result.data })
        }
    },
    async getCategoriesAction({ commit }, fn) {
        let result = await getCategories()
        if (result.code === 0) {
            commit(SAVE_CATEGORY, { categories: result.data })
        }
        typeof fn === 'function' && fn()
    },
    async getShopsAction({ commit, state }) {
        let result = await getShops(state.latitude, state.longitude)
        if (result.code === 0) {
            commit(SAVE_SHOPS, { shops: result.data })
        }
    },
    getUserAction({ commit }, { user }) {
        commit(SAVE_TOKEN, { token: user.token })
        delete user.token
        commit(SAVE_USER, { user })
    },
    async autoLoginAction({ commit }) {
        let result = await autoLogin()
        if (result.code === 0) {
            commit(SAVE_USER, { user: result.data })
        }
    }
}