import errorStackParser from 'error-stack-parser'
import { TrackOptions } from '../types'
import { MetricsType } from '../constants'
import { track } from '../track'
import { removeCircularRefs } from '../utils'


export function errorPlugin() {
  console.log('errorPlugin')
  // 同步异常
  window.addEventListener(
    'error',
    function (event) {
      const target: any = event.target || event.srcElement
      const isElementTarget =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement
      // 非资源类错误
      if (!isElementTarget) {
        const stackFrame = errorStackParser.parse(!target ? event : event.error)[0]
        // 错误文件、行号、列号、源文件、堆栈等等
        const { fileName, columnNumber, lineNumber, source } = stackFrame
        const stack = source ? removeCircularRefs(source.split('').join('').split('./')) : ''
        const errorObj: TrackOptions = {
          data: {
            message: event.message,
            url: fileName,
            line: lineNumber,
            column: columnNumber,
            stackTrace: stack,
          },
          eventType: MetricsType.JSError,
          eventName: MetricsType.JSError,
        }
        track(errorObj)
      } else {
        let url: string
        if (target instanceof HTMLLinkElement) {
          url = target.href
        } else {
          url = target.src
        }
        const errorObj: TrackOptions = {
          data: { url },
          eventType: MetricsType.ResourceError,
          eventName: MetricsType.ResourceError,
        }
        track(errorObj)
      }
    },
    true,
  )

  // 异步异常
  window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
    const error = e.reason
    const errMsg = error instanceof Error ? error.message : error
    const errorObj: TrackOptions = {
      data: typeof error === 'string' ? { message: error } : errMsg ,
      eventType: MetricsType.UnHandleRejectionError,
      eventName: MetricsType.UnHandleRejectionError,
    }
    console.log('errorObj', errorObj)
    track(errorObj)
  })
}