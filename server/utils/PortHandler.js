const detectPort = require('detect-port')

class PortHandler {
  getPort() {
    const randomPort = Math.ceil(Math.random() * (65535 - 10000) + 10000)

    return detectPort(randomPort)
  }

  async checkPort(port) {
    const _port = await detectPort(port)

    return port === _port
  }
}

module.exports = PortHandler
