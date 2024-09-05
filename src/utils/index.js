import { customAlphabet, nanoid } from 'nanoid'

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
 * @param {Number} chars
 * @returns {String}
 */
export function randomChars(size, chars) {
  const defaultChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const alphabet = chars || defaultChars

  return customAlphabet(alphabet, size)()
}
