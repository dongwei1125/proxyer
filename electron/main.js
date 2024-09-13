const { app, BrowserWindow } = require('electron/main')

const createEvent = require('./utils/event')
const createTray = require('./utils/tray')
const { preload } = require('./electron.config')

// const server = require('../server/app')

const createWindow = () =>
  new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 960,
    minHeight: 600,
    frame: false,
    center: true,
    webPreferences: { contextIsolation: false, preload },
  })

app.whenReady().then(() => {
  const win = createWindow()

  createEvent(app, win)
  createTray(app, win)

  // server.then(port => {
  //   win.loadURL('http://localhost:8080/')
  // })
  win.loadURL('http://localhost:8080/')
})
