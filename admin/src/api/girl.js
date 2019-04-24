import request from '@/utils/request'

export function getList(data = {}) {
  return request({
    url: '/girl/list',
    method: 'post',
    data
  })
}

export function getDetail(data = {}) {
  return request({
    url: '/girl/getDetail',
    method: 'post',
    data
  })
}

export function updateTop(data = {}) {
  return request({
    url: '/girl/updateTop',
    method: 'post',
    data
  })
}
