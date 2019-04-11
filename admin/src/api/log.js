import request from '@/utils/request'

export function getVisit(data = {}) {
  return request({
    url: '/log/getVisit',
    method: 'post',
    data
  })
}

export function delReq(data = {}) {
  return request({
    url: '/log/delReq',
    method: 'post',
    data
  })
}
