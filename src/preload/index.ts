import { contextBridge, ipcRenderer } from 'electron'

export type ResourceProcessSnapshot = {
  pid: number
  type: string
  cpuPercent: number
  workingSetMb: number
  privateMb: number
}

const yathuBridge = {
  platform: process.platform,
  version: '0.1.0',
  getResourceSnapshot: (): Promise<ResourceProcessSnapshot[]> =>
    ipcRenderer.invoke('yathu:get-resource-snapshot')
}

contextBridge.exposeInMainWorld('yathu', yathuBridge)

export type YathuBridge = typeof yathuBridge
