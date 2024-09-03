/**
 * @param {Number} port
 * @returns {String}
 */
export function resolveURL(port) {
  const { protocol, hostname } = window.location

  return `${protocol}//${hostname}:${port}`
}
