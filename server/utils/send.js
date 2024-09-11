const SUCCESS_CODE = 0
const FAIL_CODE = -1

/**
 * @param {Object} request
 * @param {Object} response
 * @param {Object} options
 */
function sendSuccess(response, options = {}) {
  const { data = null, message = 'success' } = options

  response.send({
    code: SUCCESS_CODE,
    data,
    message,
  })
}

/**
 * @param {Object} request
 * @param {Object} response
 * @param {Object} options
 */
function sendFail(response, options = {}) {
  const { data = null, message = 'error' } = options

  response.send({
    code: FAIL_CODE,
    data,
    message,
  })
}

module.exports = { sendSuccess, sendFail }
