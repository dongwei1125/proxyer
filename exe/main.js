const { app, BrowserWindow } = require('electron/main')

require('electron-reloader')(module)

const createEvent = require('./utils/event')
const createTray = require('./utils/tray')
const { preload } = require('./exe.config')

const server = require('../server/app')

const options = {
  width: 1200,
  height: 700,
  minWidth: 1000,
  minHeight: 640,
  frame: false,
  center: true,
  webPreferences: {
    contextIsolation: false,
    preload,
  },
}

app.whenReady().then(async () => {
  const win = new BrowserWindow(options)

  createEvent(app, win)
  createTray(app, win)

  server.then(async port => {
    await win.loadURL(`http://localhost:${port}/`)
    win.webContents.openDevTools()
  })
})
