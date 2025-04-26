import errorStackParser from 'error-stack-parser'
import { removeCircularRefs } from '../utils'
import { TrackOptions } from '../types'
import { MetricsType } from '../constants'
import { track } from '../track'

/**
 * Vue3错误监控插件
 * @param app Vue应用实例
 */
export function vue3Plugin(app) {
  console.log('vue3ErrorPlugin')
  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue 错误:', err, vm, info)
    const errorObj: TrackOptions = {
      data: {
        message: err.message,
        info,
      },
      eventType: MetricsType.VueJsError,
      eventName: MetricsType.VueJsError,
    }

    // 解析错误堆栈信息
    if (err.stack) {
      try {
        const parsedStack = errorStackParser.parse(err)[0]
        const { fileName, columnNumber, lineNumber, source } = parsedStack
        const stack = source ? removeCircularRefs(source.split('').join('').split('./')) : ''

        errorObj.data = {
          ...errorObj.data,
          url: fileName,
          line: lineNumber,
          column: columnNumber,
          stackTrace: stack,
        }
      } catch (parseErr) {
        console.error('解析堆栈信息失败:', parseErr)
      }
    } else {
      console.warn('错误对象没有堆栈信息')
    }
    track(errorObj)
    return false
  }
}