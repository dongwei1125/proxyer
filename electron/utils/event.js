const { ipcMain } = require('electron/main')

function event(app, win) {
  ipcMain.on('set-always-on-top', () => {
    win.setAlwaysOnTop(true)
  })

  ipcMain.on('window-max', () => {
    win.maximize()
  })

  ipcMain.on('window-min', () => {
    win.restore()
  })

  ipcMain.on('window-close', () => {
    win.hide()
  })
}

module.exports = event
