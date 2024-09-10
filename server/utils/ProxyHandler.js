const ProxyServer = require('./ProxyServer')

class ProxyHandler {
  constructor() {
    this.servers = new Map()
  }

  async start(id, port, json) {
    const proxyServer = new ProxyServer(port, json)

    this.servers.set(id, proxyServer)

    await proxyServer.start()
  }

  async stop(id) {
    const proxyServer = this.servers.get(id)

    if (proxyServer) {
      await proxyServer.stop()
    }
  }
}

module.exports = ProxyHandler
