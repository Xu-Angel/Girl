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

export function delFile(data = {}) {
  return request({
    url: '/log/delFile',
    method: 'post',
    data
  })
}

export function getFile(data = {}) {
  return request({
    url: '/log/getFile',
    method: 'post',
    data
  })
}
