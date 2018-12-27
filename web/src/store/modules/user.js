import { login , dictionary} from '@/api/login'
import { getToken,setInfo,setToken, removeToken } from '@/untils/auth'
import md5 from 'js-md5'
import {Message} from "element-ui";
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
      state.username = name
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
              debugger
              sessionStorage.setItem('username',username)
              commit('SET_NAME',username);
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
                debugger
                const data=response.data.data
                console.log(data)
                //根据相同的groupId组成新的数组
                let map={},
                    dest=[];
                for(var i=0;i<data.length;i++){
                    let ai=data[i];
                    if(!map[ai.groupId]){
                        dest.push({
                            groupId:ai.groupId,
                            dDescribe:ai.dDescribe,
                            data:[ai]
                        });
                        map[ai.groupId]=ai
                    }else{
                        for (var j=0;j<dest.length;j++) {
                            let dj=dest[j];
                            if(dj.groupId==ai.groupId){
                                dj.data.push(ai)
                                break;
                            }
                        }
                    }
                }
                //存储运营模式数据
                let operationDatas=dest[0].data
                let operationData=JSON.stringify(operationDatas)
                sessionStorage.setItem('operationData',operationData)
                //存储业务分类数据
                let businessDatas=dest[1].data
                let businessData=JSON.stringify(businessDatas)
                sessionStorage.setItem('businessData',businessData)
                //存储课价水平数据
                let priceleveDatas=dest[2].data
                let priceleveData=JSON.stringify(priceleveDatas)
                sessionStorage.setItem('priceleveData',priceleveData)
                //存储目标区域数据
                let regionDatas=dest[3].data
                let regionData=JSON.stringify(regionDatas)
                sessionStorage.setItem('regionData',regionData)
                //存储线索模板数据
                let cluesDatas=dest[5].data
                let cluesData=JSON.stringify(cluesDatas)
                sessionStorage.setItem('cluesData',cluesData)
                //存储需求状态数据
                //转换Json数组为Json字符串
                let needstateDatas=dest[4].data
                let needstateData1=JSON.stringify(needstateDatas)
                //存储需求状态数组  Json字符串
                sessionStorage.setItem('needstatedData',needstateData1)
                //存储所属行业数组
                let vocations=dest[7].data
                //转换Json数组为Json字符串
                let vocation=JSON.stringify(vocations)
                //存储需求状态数组  Json字符串
                sessionStorage.setItem('vocation',vocation)
                commit('SET_DICT', data);
                resolve()
            }).catch(error=>{
                reject(error)
            })
        })
      },
  /*  // 获取用户信息
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
*/
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
