const { shell } = require('electron')

const Message = require('./Message')

/**
 * @param {Object} app
 * @param {Object} win
 */
function event(app, win) {
  const message = new Message(app, win)

  message.on('set-always-on-top', () => {
    if (win.isAlwaysOnTop()) {
      win.setAlwaysOnTop(false)
    } else {
      win.setAlwaysOnTop(true)
    }
  })

  message.on('window-min', () => {
    win.minimize()
  })

  message.on('window-max', () => {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })

  message.on('window-close', () => {
    win.close()
  })

  win.on('always-on-top-changed', (event, isAlwaysOnTop) => {
    message.send('always-on-top-changed', isAlwaysOnTop)
  })

  win.on('maximize', () => {
    message.send('maximize')
  })

  win.on('unmaximize', () => {
    message.send('unmaximize')
  })

  win.on('close', event => {
    event.preventDefault()
    win.hide()
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)

    return { action: 'deny' }
  })
}

module.exports = event
