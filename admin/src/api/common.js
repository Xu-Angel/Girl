import request from '@/utils/request'

export function getSipderConfig() {
  return request({
    url: '/spider/getSipderConfig',
    method: 'get'
  })
}

export function getCounts() {
  return request({
    url: '/common/getCounts',
    method: 'get'
  })
}

