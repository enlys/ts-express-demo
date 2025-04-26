import { MetricsType } from "./constants"
import { track } from "./track"

export interface ReportOptions {
  [key: string]: any
}

export interface Monitor {
  track: typeof track
  config: MonitorConfig
  MetricsType: typeof MetricsType
}

export interface TrackOptions {
  eventName: string
  eventType?: MetricsType
  data?: object
}

export interface IDeviceInfo {
  browser: string
  mobile?: string
  isPhone: boolean
  userAgent: string
  os: string
  cpu: string
  engine: string
  screenW: number
  screenH: number
  dpr: number
}

export interface MonitorConfig {
  serverUrl: string
  debug: boolean
  useImg: boolean
}