const message = require('./message')

/**
 * @param {Object} app
 * @param {Object} win
 */
function event(app, win) {
  message.on('set-always-on-top', (event, data, resolve, reject) => {
    win.setAlwaysOnTop(true)
  })

  message.on('window-min', (event, data, resolve, reject) => {
    win.minimize()
  })

  message.on('window-max', (event, data, resolve, reject) => {
    win.maximize()
  })

  message.on('window-close', (event, data, resolve, reject) => {
    win.hide()
  })
}

module.exports = event
