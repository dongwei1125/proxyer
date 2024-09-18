const { ipcMain } = require('electron/main')

const channel = 'ipc-message'
const ipcMains = new Map()

ipcMain.on(channel, (event, { eventName, args, timestamp }) => {
  const callback = ipcMains.get(eventName)
  const resolve = data => {
    event.sender.send(channel, { eventName, data, timestamp })
  }
  const reject = error => {
    event.sender.send(channel, { eventName, error, timestamp })
  }

  callback?.(event, args, resolve, reject)
})

/**
 * @param {String} eventName
 * @param {Function} callback
 */
function on(eventName, callback) {
  if (ipcMains.get(eventName)) return

  ipcMains.set(eventName, callback)
}

module.exports = { on }
