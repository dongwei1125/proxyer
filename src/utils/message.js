const renderer = window.ipcRenderer
const channel = 'ipc-message'
const ipcRenderers = new Map()

renderer?.on(channel, (event, { eventName, data, error, timestamp }) => {
  const key = `${eventName}_${timestamp}`
  const { resolve, reject } = ipcRenderers.get(key)

  if (error) {
    reject(error)
  } else {
    resolve(data)
  }
})

/**
 * @param {String} eventName
 * @returns {Promise}
 */
function send(eventName, ...args) {
  return new Promise((resolve, reject) => {
    const timestamp = window.performance.now()
    const key = `${eventName}_${timestamp}`

    ipcRenderers.set(key, { resolve, reject })
    renderer?.send(channel, { eventName, args, timestamp })
  })
}

export default { send }
