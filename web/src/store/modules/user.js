import { login , dictionary} from '@/api/login'
import { getToken, setToken, removeToken } from '@/untils/auth'
import md5 from 'js-md5'

const user = {
  state: {
    token: getToken(),
    username: '',
    password:'',
    avatar: '',
    roles: [],
    dict:[],
    updateTableList: false //页面数据刷新

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_DICT: (state, dict) => {
        state.dict = dict
    },
    UPLOAD_TABLE_LIST: (state,update) => {
          state.updateTableList = update
      },

  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
        const password=md5(userInfo.password)
      return new Promise((resolve, reject) => {
        login(username,password).then(response => {
              setToken(response.data.data)
              commit('SET_TOKEN', response.data.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
      //字典管理
    dictionary({ commit }){
        return new Promise((resolve , reject)=>{
            dictionary().then(response=>{
                const data=response.data.data
                commit('SET_DICT', data);
                resolve()
            }).catch(error=>{
                reject(error)
            })
        })
      },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
