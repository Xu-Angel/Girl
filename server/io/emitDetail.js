
export function emitDetail(socket) {
  return new Promise((resole, reject) => {
    socket.emit('send', { hi: 'hello' })
  })
}