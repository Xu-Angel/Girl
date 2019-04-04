/**
 * 列表页Socket
 */
export default function socketGetListStatus(IO, G) {
  return new Promise((resolve, reject) => {
    try {
      IO.of('/socket/start/getList').on('connect', (socket) => {
        socket.on('start', (data) => {
          !G.ListStatusRate && socket.emit('noTask', { text: `请求时间${new Date()}---列表页Socket---暂无任务进行中` })
          console.log(data)
        })
        G.ListStatusRate && setInterval(() => {
          socket.emit('rate', { ...G.ListStatusRate })
        }, 1000)
        G.ListStatuspageErr && setInterval(() => {
          socket.emit('pageErr', { ...G.ListStatuspageErr })
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