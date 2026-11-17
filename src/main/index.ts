import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import { join } from 'node:path'

let mainWindow: BrowserWindow | null = null

// Metrics are sampled only when the user explicitly requests them.
// There is deliberately no background polling or monitoring timer.
ipcMain.handle('yathu:get-resource-snapshot', () => {
  return app.getAppMetrics().map((processInfo) => ({
    pid: processInfo.pid,
    type: processInfo.type,
    cpuPercent: processInfo.cpu.percentCPUUsage,
    workingSetMb: Math.round((processInfo.memory.workingSetSize / 1024) * 10) / 10,
    privateMb: Math.round((processInfo.memory.privateBytes / 1024) * 10) / 10
  }))
})

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1040,
    minHeight: 680,
    title: 'Yathu.ai',
    backgroundColor: '#101918',
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#101918',
      symbolColor: '#dce8e3',
      height: 38
    },
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    void mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    void mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  // One global shortcut; no resident command or AI worker is started here.
  globalShortcut.register('CommandOrControl+Space', () => {
    if (!mainWindow) createWindow()
    else {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('will-quit', () => globalShortcut.unregisterAll())
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
