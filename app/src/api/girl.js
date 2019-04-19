import request from './http'

export function getList(data = {}) {
  return request({
    url: '/girl/list',
    method: 'post',
    data
  })
}

export function getDetail(data = {}) {
  return request({
    url: '/girl/getdetail',
    method: 'post',
    data
  })
}
