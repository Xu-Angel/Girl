import request from '@/utils/request'

export function login(data = {}) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getList(data = {}) {
  return request({
    url: '/admin/getList',
    method: 'post',
    data
  })
}

export function delAdmin(data = {}) {
  return request({
    url: '/admin/delAdmin',
    method: 'post',
    data
  })
}

export function updateInfo(data = {}) {
  return request({
    url: '/admin/updateInfo',
    method: 'post',
    data
  })
}
