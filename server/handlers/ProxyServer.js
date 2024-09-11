const { createServer } = require('http')
const httpProxy = require('http-proxy')
const HttpProxyRules = require('http-proxy-rules')

const { createPromise } = require('../utils')

class ProxyServer {
  /**
   * @param {Number} port
   * @param {Object} json
   */
  constructor(port, json) {
    this.port = port
    this.config = json
    this.server = null
  }

  /**
   * @returns {Promise}
   */
  async start() {
    const { promise, resolve, reject } = createPromise()
    const { target, rules, ...rest } = this.config
    const proxyRules = new HttpProxyRules({
      rules: rules || {},
      default: target,
    })
    const proxy = httpProxy.createProxy()

    this.server = createServer((request, response) => {
      const target = proxyRules.match(request)

      if (target) {
        return proxy.web(request, response, {
          ...rest,
          target,
        })
      }
    })

    this.server.listen(this.port, () => {
      resolve()
    })

    // websocket
    this.server.on('upgrade', (request, socket, head) => {
      const target = proxyRules.match(request)

      if (target) {
        proxy.ws(request, socket, head, {
          ...this.rest,
          target,
        })
      }
    })

    return promise
  }

  /**
   * @returns {Promise}
   */
  async stop() {
    const { promise, resolve, reject } = createPromise()

    this.server.close(error => {
      error ? reject(error) : resolve()
    })

    return promise
  }
}

module.exports = ProxyServer
