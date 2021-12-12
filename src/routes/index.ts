import { Router, RequestHandler } from 'express';
import Data from '../controllers/Data';
import { CONTROLLER_METADATA, ROUTE_METADATA, MIDDLE_WARES, ROUTE_PATH } from '../common/constant';
console.log('router');

const router = Router();

const controllerStore = {
  data: new Data(),
};

Object.values(controllerStore).forEach(instance => {
  const controllerMetadata: string = Reflect.getMetadata(CONTROLLER_METADATA, instance.constructor);

  const proto = Object.getPrototypeOf(instance);
  // 拿到该实例的原型方法
  const routeNameArr = Object.getOwnPropertyNames(proto).filter(
    n => n !== 'constructor' && typeof proto[n] === 'function',
  );

  routeNameArr.forEach(routeName => {
    const method = Reflect.getMetadata(ROUTE_METADATA, instance, routeName);
    const path = Reflect.getMetadata(ROUTE_PATH, instance, routeName);
    const middlewares: RequestHandler[] = Reflect.getMetadata(MIDDLE_WARES, instance, routeName)
    const handler = instance[routeName];
    console.log(111, method, path, middlewares, handler);
    if (path && method) {
        if (middlewares && middlewares.length) {
            router[method](`${controllerMetadata}${path}`, ...middlewares, handler)
        } else {
            router[method](`${controllerMetadata}${path}`, handler)
        }
    }
  });
});

export default router;