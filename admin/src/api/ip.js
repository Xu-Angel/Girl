import request from '@/utils/request'

export function startSpiIp(data = {}) {
  return request({
    url: '/ip/startSpiIp',
    method: 'post',
    data
  })
}
export function startSpiIpPool(data = {}) {
  return request({
    url: '/ip/startSpiIpPool',
    method: 'post',
    data
  })
}

export function getIpList(data = {}) {
  return request({
    url: '/ip/getIpList',
    method: 'post',
    data
  })
}

export function checkIp(data = {}) {
  return request({
    url: '/ip/checkIp',
    method: 'post',
    data
  })
}

export function distinct() {
  return request({
    url: '/ip/distinct',
    method: 'get'
  })
}
