/* 
对axios进行二次封装
*/

import axios from 'axios'
import qs from 'qs'
import { MessageBox } from 'mint-ui'

import router from '../router'
// 生成一个Axios的伪实例
const instance = axios.create({
    baseURL: '/api'
})

// 1.添加请求拦截器
instance.interceptors.request.use(config => {
    //config:url,method,data
    //目的:批量添加或者请求的参数
    //post请求的默认参数格式是json对象形式需要转换成urlencoded格式
    if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
        config.data = qs.stringify(config.data)
    }
    //将token保存到请求头当中 哪些地方需要token则携带token
    let token = localStorage.getItem('token_key')
    if (config.headers.needToken) {
       if(token){
        config.headers.authorization = token
       }else{
           throw new Error('没有token,请先登录')
       }
    }
    return config
})

// 2.添加响应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
        if (!error.message) { //没有发请求
            MessageBox.alert(error.message)
            router.currentRoute.path !== '/login' && router.replace('/login')
        } else {
            // 有token token过期
            if (error.response.status === 401) {
                MessageBox.alert('token已过期 请重新登录')
                router.currentRoute.path !== '/login' && router.replace('/login')
            } else if (error.response.status === 404) {
                //请求404
                MessageBox.alert('请求资源未定位')
            } else {
                //其他原因
                MessageBox.alert('请求失败')
            }
        }
        // console.log(error.message)
        // 中断promise链 保证不会进入下个成功的回调
        return new Promise(() => { })
    }
)

export default instance