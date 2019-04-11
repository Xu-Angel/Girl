/**
 * Ip池Socket
 */
export default function socketGetIpStatus(IO, G) {
  return new Promise((resolve, reject) => {
    try {
      IO.of('/socket/start/getIp').on('connect', (socket) => {
        socket.on('start', (data) => {
          (!G.IpStatusRate && ! G.IpStatusIpErr) && socket.emit('noTask', { text: `请求时间${new Date()}---Ip池Socket---暂无任务进行中` })
          console.log(data)
        })
        G.IpStatusRate && setInterval(() => {
          socket.emit('rate', { ...G.IpStatusRate })
        }, 1000)
        G.IpStatusIpErr && setInterval(() => {
          socket.emit('ipErr', { ...G.IpStatusIpErr })
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