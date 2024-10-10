import { MonitorType } from "../types"

export interface Monitor {
  id: string
  type: MonitorType
  name: string
  url?: string
  request?: string
  last_data_on?: Date
  last_data?: MonitorLastData
  created_at: Date
  updated_at?: Date
}

interface MonitorLastData {
  cpu?: CPU
  memory?: Memory
  os?: OS
  uptime: number
}

interface CPU {
  used_percent?: number
}

interface Memory {
  total: number
  available: number
  used: number
  used_percent: number
}

interface OS {
  platform: string
  platform_family: string
  platform_version: string
  type: string
  kernel_version: string
  kernel_arch: string
}

export interface MonitorHistory {
  time: Date
  status_code: number
  response_time: number
}