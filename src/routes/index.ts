import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import { Router, RequestHandler } from 'express';
import { CONTROLLER_METADATA, ROUTE_METADATA, MIDDLE_WARES, ROUTE_PATH } from '../common/constant';

const router = Router();

const files = fs.readdirSync(path.join(__dirname, '..', 'controllers'));

// 扫描controllers目录下的文件
files.forEach(file => {
  const dirPath = path.join(__dirname, '..', 'controllers', file);
  if (fs.statSync(dirPath).isFile() &&file.endsWith('.ts')) {
    const fileName = file.replace('.ts', '');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(`../controllers/${fileName}`);
    console.log('module', module);
    // 使用 module
    const instance = new module.default();
    const controllerMetadata: string = Reflect.getMetadata(CONTROLLER_METADATA, instance.constructor);
    if (controllerMetadata) {
      const proto = Object.getPrototypeOf(instance);
      // 拿到该实例的原型方法
      const routeNameArr = Object.getOwnPropertyNames(proto).filter(
        n => n !== 'constructor' && typeof proto[n] === 'function',
      );
      routeNameArr.forEach(routeName => {
        const method: string = Reflect.getMetadata(ROUTE_METADATA, instance, routeName);
        const path: string = Reflect.getMetadata(ROUTE_PATH, instance, routeName);
        const middlewares: RequestHandler[] = Reflect.getMetadata(MIDDLE_WARES, instance, routeName);
        const handler: RequestHandler = instance[routeName];
        console.log(method, controllerMetadata, path);
        if (path && method) {
          if (middlewares && middlewares.length) {
            router[method](`${controllerMetadata}${path}`, ...middlewares, handler);
          } else {
            router[method](`${controllerMetadata}${path}`, handler);
          }
        }
      });
    }
  }
});

export default router;
