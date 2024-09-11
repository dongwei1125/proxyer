/**
 * @returns {Object}
 */
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

module.exports = { createPromise }
