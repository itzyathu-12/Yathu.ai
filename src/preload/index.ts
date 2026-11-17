import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('yathu', {
  platform: process.platform,
  version: '0.1.0'
})

export type YathuBridge = {
  platform: string
  version: string
}
