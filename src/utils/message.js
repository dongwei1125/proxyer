class Message {
  constructor() {
    this.renderer = window.ipcRenderer
  }

  /**
   * @param {String} eventName
   */
  send(eventName, ...args) {
    this.renderer?.send(eventName, ...args)
  }

  /**
   * @param {String} eventName
   * @param {Function} callback
   */
  on(eventName, callback) {
    this.renderer?.on(eventName, callback)
  }
}

export default new Message()
