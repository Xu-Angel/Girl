import request from '@/utils/request'

export function getList(data = {}) {
  return request({
    url: '/girl/list',
    method: 'post',
    data
  })
}

export function distinctGirls() {
  return request({
    url: '/girl/distinct',
    method: 'get'
  })
}
