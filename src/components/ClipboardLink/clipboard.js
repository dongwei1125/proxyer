import Clipboard from 'clipboard'

/**
 * @param {String} text
 * @returns {Promise}
 */
export function copyText(text) {
  return new Promise((resolve, reject) => {
    const button = document.createElement('button')
    const clipboard = new Clipboard(button, { text: () => text })

    clipboard.on('success', result => {
      clipboard.destroy()

      resolve(result)
    })

    clipboard.on('error', error => {
      clipboard.destroy()

      reject(error)
    })

    button.click()
  })
}
