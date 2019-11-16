/*
包含多个直接更新状态数据方法的对象 
 */
import {
    SAVE_ADDRESS,
    SAVE_CATEGORY,
    SAVE_SHOPS,
    SAVE_TOKEN,
    SAVE_USER,
    LOGOUT,
 
} from './mutation-types'
export default {
    [SAVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [SAVE_CATEGORY](state, { categories }) {
        state.categories = categories
    },
    [SAVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [SAVE_USER](state, { user }) {
        state.user = user
    },
    [SAVE_TOKEN](state, { token }) {
        localStorage.setItem('token_key', token)
        state.token = token
    },
    [LOGOUT](state) {
        state.user = {}
        state.token = ''
        localStorage.removeItem('token_key')
    },
   

}