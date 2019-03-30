import request from '@/utils/request'

export function updateTaskConfig(data = {}) {
  return request({
    url: '/spider/updateTaskConfig',
    method: 'post',
    data
  })
}

export function distinctGirl() {
  return request({
    url: '/spider/distinctGirl',
    method: 'get'
  })
}


