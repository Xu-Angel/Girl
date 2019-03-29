import admin from './admin'
import girl from './girl'
import spider from './spider'
import common from './common'
export default app => {
  app.get('/', (req, res, next) => {
  	res.redirect('/')
  })
  app.use('/admin', admin)
  app.use('/girl', girl)
  app.use('/spider', spider)
  app.use('/common', common)
}