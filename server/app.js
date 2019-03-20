import express from 'express';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import chalk from 'chalk';
import history from 'connect-history-api-fallback';

const app = express();

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}
});

app.use(cookieParser());

router(app);

app.use(history());
app.use(express.static('./public'));
app.listen(8088, () => {
	console.log(
		chalk.green(`成功监听端口：8088`)
	)
});