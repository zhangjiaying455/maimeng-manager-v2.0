import request from '@/untils/request'
import   Qs  from  'qs'
//登录
export function login(username,password) {
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest: [function(data) {      //在请求之前对data传参进行格式转换
            data = Qs.stringify(data)
            return data
        }],
        url: 'authserver/user/login',                           //接口地址
        method: 'post',                             //请求类型
        params: {},
        data: {
            'account':username,                      //传的参数
            'password':password,
        }
    })
}
//字典管理
export function dictionary() {
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        url:'mai-meng-cloud/dict',
        method:'get',
        params: {}
    })

}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
