import { customAlphabet, nanoid } from 'nanoid'
import isElectronEnv from 'is-electron'

export const isElectron = isElectronEnv()

/**
 * @param {Number} port
 * @returns {String}
 */
export function resolveURL(port) {
  const { protocol, hostname } = window.location

  return `${protocol}//${hostname}:${port}`
}

/**
 * @returns {String}
 */
export function generateId() {
  return nanoid()
}

/**
 * @param {Number} size
 * @param {String} chars
 * @returns {String}
 */
export function randomChars(size, chars) {
  const defaultChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const alphabet = chars || defaultChars

  return customAlphabet(alphabet, size)()
}

/**
 * @param {String} url
 * @returns {Boolean}
 */
export function validateURL(url) {
  const regexp =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

  return regexp.test(url)
}

/**
 * @param {Array} array
 * @returns {Array}
 */
export function unique(array) {
  return array.filter((item, index, self) => self.indexOf(item) === index)
}
