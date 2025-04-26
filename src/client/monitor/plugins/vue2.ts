import errorStackParser from 'error-stack-parser'
import { removeCircularRefs } from '../utils'
import { TrackOptions } from '../types'
import { MetricsType } from '../constants'
import { track } from '../track'


export function vue2Plugin(Vue) {
  console.log('vue2ErrorPlugin')
  Vue.config.errorHandler = (err, vm, info) => {
    const errorObj: TrackOptions = {
      data: {
        message: err.message,
        info,
      },
      eventType: MetricsType.VueJsError,
      eventName: MetricsType.VueJsError,
    }
    // 检查是否有堆栈信息
    if (err.stack) {
      try {
        const parsedStack = errorStackParser.parse(err)[0];
        // 错误文件、行号、列号、源文件、堆栈等等
        const { fileName, columnNumber, lineNumber, source } = parsedStack
        const stack = source ? removeCircularRefs(source.split('').join('').split('./')) : ''
        errorObj.data = {
          message: err.message,
          info,
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