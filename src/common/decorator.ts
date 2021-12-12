import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods, CONTROLLER_METADATA, ROUTE_METADATA, MIDDLE_WARES, ROUTE_PATH } from './constant';

export function controller(domian: string) {
    return target => {
        Reflect.defineMetadata(CONTROLLER_METADATA, domian, target);
    }
}

function getRequestDecorator(type: Methods) {
    return function (path: string) {
        return function (target, key: string) {
            Reflect.defineMetadata(ROUTE_PATH, path, target, key)
            Reflect.defineMetadata(ROUTE_METADATA, type, target, key)
        }
    }
}

export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)
export const put = getRequestDecorator(Methods.put)
export const del = getRequestDecorator(Methods.delete)

export function use(middleware: RequestHandler) {
    return function (target, key: string) {
      const middlewares = Reflect.getMetadata(MIDDLE_WARES, target, key) || []
      middlewares.push(middleware)
      Reflect.defineMetadata('middlewares', middlewares, target, key)
    }
  }
  