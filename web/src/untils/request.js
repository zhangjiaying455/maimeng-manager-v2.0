import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/untils/auth'
import OSS from "ali-oss";

// 创建axios实例
const service = axios.create({
    baseURL: "http://47.92.107.76/api", // api的base_url
    timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
      if (store.getters.token) {
        config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      };
    if (store.getters.token) {
        config.headers.Authorization = `${getToken()}`;
    }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
});
// respone拦截器
service.interceptors.response.use(
    response => {
        debugger
        /**
        * code为非20000是抛错 可结合自己业务进行修改
        */
        const res = response.data

            return response
    },
    error => {
        debugger
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })

        console.log(error.response.status)
        // return Promise.reject(error)
    }
)
export default service
