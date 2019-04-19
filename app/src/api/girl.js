import request from './http'

export function getList(data = {}) {
  return request({
    url: '/girl/list',
    method: 'post',
    data
  })
}
