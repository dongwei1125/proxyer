const detectPort = require('detect-port')

/**
 * @returns {Promise}
 */
function getPort() {
  const randomPort = Math.ceil(Math.random() * (65535 - 10000) + 10000)

  return detectPort(randomPort)
}

/**
 * @returns {Promise}
 */
async function checkPortOccupy(port) {
  const _port = await detectPort(port)

  return !(port === _port)
}

module.exports = { getPort, checkPortOccupy }
