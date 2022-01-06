import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import bodyParser from "body-parser"; // 解析body
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import compression from 'compression'; // 开启GZIP压缩 
import helmet from 'helmet'; // web 安全防护中间件(按需使用) https://www.npmjs.com/package/helmet
import csrf from 'csurf';  // 防止跨站点请求伪造
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import history from 'connect-history-api-fallback';
import fs from 'fs';
// import cors from 'cors'; // 允许跨域（按需使用）
// import pkg from '../package.json';
import router from "./routes";
import assetPath from "./helpers/assetPath";

const app = express();

const isProd: boolean = process.env.NODE_ENV === 'production';
const publicPath: string = '/demo/';
const port: any = process.env.HTTP_PORT || '3000';
const ip: string = process.env.HTTP_IP || '0.0.0.0';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('trust proxy', true);

app.use(compression());
// app.use(helmet());
app.use(helmet.xssFilter());
app.use(publicPath, express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['session-secret'],
}));
app.use(csrf());
// app.use(cors());

if (app.get('env') === "production") {
  const content = fs.readFileSync(path.join(__dirname, "../public/manifest.json"), "utf8");
  app.set('assetsManifest', JSON.parse(content))
}

// 1.添加代理
if (app.get('env') === 'development') {
  // proxy middleware options
  const options = {
    target: 'http://localhost:3809', // target host
    // changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      '^/demo/assets/': `/demo/assets/`, // rewrite path
    },
  };
  app.use(
    `/demo/assets/`,
    createProxyMiddleware(options),
  );
}

// 2.适配路由 HTML5 history模式
app.use(
  publicPath,
  history({
    index: '/',
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: context => context.parsedUrl.pathname
      }
    ]
  })
);


// api
app.use(`${publicPath}api`, router);
// page
app.get(`${publicPath}`, async (req: any, res: Response) => {
  res.render('index', {
    title: 'demo',
    isProd,
    publicPath,
    csrfToken: req.csrfToken(),
    asset_path: assetPath(req, {
      publicPath: `${publicPath}assets/`,
      prepend: ''
    }),
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