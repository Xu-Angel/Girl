/**
 * 详细页Socket
 */
export default function socketGetDetailStatus(IO, G) {
  return new Promise((resolve, reject) => {
    try {
      IO.of('/socket/start/getDetail').on('connect', (socket) => {
        socket.on('start', (data) => {
          (!G.DetailStatusRate && !G.DetailStatusCookieErr && !G.DetailStatuspageErr && !G.DetailStatusUidErr) && socket.emit('noTask', { text: `请求时间${new Date()}---详细页Socket---暂无任务进行中` })
          console.log(data)
        })
        G.DetailStatusRate && setInterval(() => {
          socket.emit('rate', { ...G.DetailStatusRate })
        }, 1000)
        G.DetailStatusCookieErr && setInterval(() => {
          socket.emit('cookieErr', { ...G.DetailStatusCookieErr })
        }, 1000)
        G.DetailStatuspageErr && setInterval(() => {
          socket.emit('pageErr', { ...G.DetailStatuspageErr })
        }, 1000)
        G.DetailStatusUidErr && setInterval(() => {
          socket.emit('uidErr', { ...G.DetailStatusUidErr })
        }, 1000)
        socket.on('stop', (data) => { // 客户端提出关闭
          console.log(data)
          socket.disconnect(true)
        })
        socket.on('disconnect', (reason) => { // 服务端关闭
          console.log(reason)
          socket.disconnect(true)
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
}

