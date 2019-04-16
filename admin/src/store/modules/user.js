import { login, logout, getInfo } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    id: '',
    createTime: '',
    region: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_REGION: (state, region) => {
      state.region = region
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_CREATETIME: (state, createTime) => {
      state.createTime = createTime
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password }).then(response => {
          if (response.status === 200) {
            setToken(response.token) // 通过session 会话 可忽略token
            commit('SET_TOKEN', response.token)
            Message({
              message: response.message,
              type: 'success',
              duration: 5 * 1000
            })
          } else if (response.status === 400) {
            Message({
              message: response.message,
              type: 'error',
              duration: 5 * 1000
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log('info')
          const data = response.data
          if (data.role) {
            commit('SET_ROLES', data.role)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_REGION', response.region)
          commit('SET_ID', data.id)
          commit('SET_CREATETIME', data.createTime)
          commit('SET_AVATAR', !/^[a-z][a-z0-9+.-]*:/.test(data.avatar) && !/default_avatar/.test(data.avatar) ? process.env.BASE_API + data.avatar : '')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出TODO:
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(rs => {
          if (rs.status === 200) {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出TODO:
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
