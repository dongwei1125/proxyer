const SUCCESS_CODE = 0
const FAIL_CODE = -1

class ResponseHandler {
  success(request, response, options = {}) {
    const { data = null, message = 'success' } = options

    response.send({
      code: SUCCESS_CODE,
      data,
      message,
    })
  }

  fail(request, response, options = {}) {
    const { data = null, message = 'error' } = options

    response.send({
      code: FAIL_CODE,
      data,
      message,
    })
  }
}

module.exports = ResponseHandler
