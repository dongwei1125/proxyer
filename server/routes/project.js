const express = require('express')

const ResponseHandler = require('../utils/ResponseHandler')

const router = express.Router()
const handler = new ResponseHandler()

router.get('/list', (request, response) => {
  handler.success(request, response)
})

router.get('/create', (request, response) => { })

router.get('/update', (request, response) => { })

router.get('/delete', (request, response) => { })

router.get('/getPort', (request, response) => { })

router.get('/getProject', (request, response) => { })

module.exports = router
