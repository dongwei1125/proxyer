const { ipcMain } = require('electron/main')

class Message {
  constructor(app, win) {
    this.app = app
    this.win = win
  }

  /**
   * @param {String} eventName
   */
  send(eventName, ...args) {
    this.win.webContents.send(eventName, ...args)
  }

  /**
   * @param {String} eventName
   * @param {Function} callback
   */
  on(eventName, callback) {
    ipcMain.on(eventName, callback)
  }
}

module.exports = Message
