const { createServer } = require('http')
const httpProxy = require('http-proxy')
const HttpProxyRules = require('http-proxy-rules')

function createPromise() {
  var resolve, reject

  const promise = new Promise((resolveCallback, rejectCallback) => {
    resolve = resolveCallback
    reject = rejectCallback
  })

  return {
    promise,
    resolve,
    reject,
  }
}

class ProxyServer {
  constructor(port, json) {
    this.port = port
    this.config = json
    this.server = null
  }

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

  async stop() {
    const { promise, resolve, reject } = createPromise()

    this.server.close(error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })

    return promise
  }
}

module.exports = ProxyServer
