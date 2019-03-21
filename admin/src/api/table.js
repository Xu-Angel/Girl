import request from '@/utils/request'

export function getList(data = {}) {
  return request({
    url: '/girl/list',
    method: 'post',
    data
  })
}
