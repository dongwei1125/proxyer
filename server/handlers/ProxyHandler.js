const ProxyServer = require('./ProxyServer')

class ProxyHandler {
  constructor() {
    this.servers = new Map()
  }

  /**
   * @param {String} id
   * @param {Number} port
   * @param {Object} json
   */
  async start(id, port, json) {
    const proxyServer = new ProxyServer(port, json)

    this.servers.set(id, proxyServer)

    await proxyServer.start()
  }

  /**
   * @param {String} id
   */
  reload(id) { }

  /**
   * @param {String} id
   * @returns {Promise}
   */
  async stop(id) {
    const proxyServer = this.servers.get(id)

    if (proxyServer) await proxyServer.stop()
  }
}

module.exports = ProxyHandler
