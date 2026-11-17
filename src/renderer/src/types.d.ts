import type { ResourceProcessSnapshot } from '../../../preload'

declare global {
  interface Window {
    yathu: {
      platform: string
      version: string
      getResourceSnapshot: () => Promise<ResourceProcessSnapshot[]>
    }
  }
}

export {}
