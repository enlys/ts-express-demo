import { MetricsType, PerformanceDataType } from '../constants'
import { track } from '../track'
import { TrackOptions } from '../types'

const handlePerformanceEntry = (entryList: PerformanceEntryList) => {
  const reportData: TrackOptions = {
    eventName: MetricsType.Performance,
    eventType: MetricsType.Performance,
  }

  const commonTrack = (data: object) => {
    track({
      ...reportData,
      data,
    })
  }

  for (const entry of entryList) {
    switch (entry.name) {
      case PerformanceDataType.FirstPaint:
        commonTrack({ FP: entry.startTime })
        break
      case PerformanceDataType.FirstContentfulPaint:
        commonTrack({ FCP: entry.startTime })
        break
      default:
        break
    }

    switch (entry.entryType) {
      case PerformanceDataType.LargestContentfulPaint:
        commonTrack({ LCP: entry.startTime })
        break
      case PerformanceDataType.LongTask:
        commonTrack({ LongTask: entry.startTime })
        break
      case PerformanceDataType.Resource:
        // too many resources loaded
        break
      default:
        break
    }
  }
}

export function performancePlugin() {
  if (window.PerformanceObserver) {
    const observer = new PerformanceObserver((list) => {
      handlePerformanceEntry(list.getEntries())
    })

    // 开始绘制页面的时间点
    observer.observe({
      type: 'paint',
      buffered: true,
    })
    // 页面中视口中最大的可见元素被渲染的时间点
    observer.observe({
      type: 'largest-contentful-paint',
      buffered: true,
    })
    // 页面中长任务
    observer.observe({
      type: 'longtask',
      buffered: true,
    })
    // 网络资源的加载情况
    observer.observe({
      type: 'resource',
      buffered: true,
    })
  }
}
