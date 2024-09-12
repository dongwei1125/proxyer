const { app, BrowserWindow } = require('electron/main')
const server = require('../server/app')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  server.then(port => {
    win.loadURL(`http://localhost:${port}/`)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
