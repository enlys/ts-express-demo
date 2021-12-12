import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import bodyParser from "body-parser"; // 解析body
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import compression from 'compression';
import helmet from 'helmet';
import csrf from 'csurf';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import pkg from '../package.json';
import router from "./routes";

const app = express();

const isProd: boolean = process.env.NODE_ENV === 'production';
const publicPath: string = pkg.path || '/';
const port: any = process.env.HTTP_PORT || '3000';
const ip: string = process.env.HTTP_IP || '0.0.0.0';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(helmet());
app.use(publicPath, express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['session-secret'],
}));
app.use(csrf());


console.log(app.get('env'));

if (app.get('env') === 'development') {
  // proxy middleware options
  const options = {
    target: 'http://localhost:3809', // target host
    // changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      '^/demo/assets/': `demo/assets/`, // rewrite path
    },
  };
  app.use(
    `/demo/assets/`,
    createProxyMiddleware(options),
  );
}
// api
app.use(`${publicPath}api`, router);
// page
app.get('*', async (req: any, res) => {
  res.render('index', {
    title: 'demo',
    isProd,
    publicPath,
    csrfToken: req.csrfToken(),
  });
});

// error handler
app.use((err, req: Request, res: Response, next: NextFunction) => { // eslint-disable-line
  const status = 200;
  res.status(status).json({
    status: 404,
    message: err.message,
  });
});

app.listen(port, ip, () => {
  console.log(`Server started at http://${ip}:${port}`); // eslint-disable-line no-console
});

export default app;