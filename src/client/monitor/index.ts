import { track } from './track'
import {
  errorPlugin,
  vue3Plugin
} from './plugins/index'
import type { MonitorConfig, Monitor } from './types'
import ctxConfig from './config'
import { MetricsType } from './constants'

function initPlugins() {
  [errorPlugin].forEach(
    (plugin) => plugin(),
  )
}

let monitorInstance: Monitor

// 1 作为创建的入口，使用之前创建一个监视器
export function createMonitor(config: Partial<MonitorConfig>) {
  if (monitorInstance) {
    return monitorInstance
  }

  ctxConfig.set(config)

  monitorInstance = Object.freeze({
    track,
    config: ctxConfig.get(),
    MetricsType,
  })

  initPlugins()

  return monitorInstance
}

// 2 作为获取监视器的入口，使用之前获取一个监视器
export function getMonitor() {
  return monitorInstance
}

// 3 作为使用vue插件的入口，使用之前使用vue插件
export {
  vue3Plugin,
}