import admin from './admin'


export default app => {
  // app.get('/', (req, res, next) => {
  // 	res.redirect('/');
  // });
  // app.use('/v1', v1);
  // app.use('/v2', v2);
  // app.use('/v3', v3);
  // app.use('/v4', v4);
  // app.use('/ugc', ugc);
  // app.use('/bos', bos);
  // app.use('/eus', eus);
  app.use('/admin', admin);

}