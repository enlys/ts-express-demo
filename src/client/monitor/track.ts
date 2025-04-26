import { MetricsType } from './constants'
import { report } from './report'
import { getDeviceInfo } from './device'
import {
  getNetworkType,
  getPageUrl,
} from './utils'
import deepMerge from 'deepmerge'

import { TrackOptions } from './types'

export function track(options: { eventName: string; data?: any }): void
export function track(options: TrackOptions): void
export function track(options: TrackOptions): void {
  const { data, eventType = MetricsType.Custom, ...otherOptions } = options
  const deviceInfo = getDeviceInfo()
  const networkType = getNetworkType()
  const pageUrl = getPageUrl()
  const baseConfig = {
    networkType,
    pageUrl,
    ...deviceInfo,
  }
  const metricsData = deepMerge(
    baseConfig,
    data || {},
  )
  const reportData = Object.assign({}, { eventType }, otherOptions, metricsData)
  report(reportData)
}
