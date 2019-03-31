import request from '@/utils/request'

export function updateTaskConfig(data = {}) {
  return request({
    url: '/spider/updateTaskConfig',
    method: 'post',
    data
  })
}

export function distinctGirl(data = {}) {
  return request({
    url: '/spider/distinctGirl',
    method: 'post',
    data
  })
}

export function spiDetailByRealUid(data = {}) {
  return request({
    url: '/spider/spiDetailByRealUid',
    method: 'post',
    data
  })
}

export function exportRealUid(data = {}) {
  return request({
    url: '/spider/exportRealUid',
    method: 'post',
    data
  })
}
