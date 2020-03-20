import admin from './admin'
import girl from './girl'
import spider from './spider'
import ip from './ip'
import log from './log'
import common from './common'
import statistics from './statistics'
export default app => {
  app.use('/admin', admin)
  app.use('/girl', girl)
  app.use('/spider', spider)
  app.use('/common', common)
  app.use('/ip', ip)
  app.use('/log', log)
  app.use('/statistics', statistics)
}