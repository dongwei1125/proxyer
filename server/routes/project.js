const { Router } = require('express')
const stripJsonComments = require('strip-json-comments')

const DatabaseHandler = require('../utils/DatabaseHandler')
const ResponseHandler = require('../utils/ResponseHandler')
const PortHandler = require('../utils/PortHandler')
const ProxyHandler = require('../utils/ProxyHandler')
const { SERVER_STATUS } = require('../utils/const')

const router = Router()

const databaseHandler = new DatabaseHandler()
const responseHandler = new ResponseHandler()
const portHandler = new PortHandler()
const proxyHandler = new ProxyHandler()

router.get('/list', (request, response) => {
  const query = request.query
  const pageNo = Number(query.pageNo || 1)
  const pageSize = Number(query.pageSize || 10)

  const rows = databaseHandler.getData(pageNo, pageSize)
  const total = databaseHandler.getTotal()
  const data = { rows, total, pageNo, pageSize }

  responseHandler.success(request, response, { data })
})

router.post('/create', (request, response) => {
  const { name, port, configs, description } = request.body

  databaseHandler.create({ name, port, configs, description, status: SERVER_STATUS.STOP })

  responseHandler.success(request, response)
})

router.post('/update', (request, response) => {
  const { id, name, port, configs, description, status } = request.body

  databaseHandler.update({ id, name, port, configs, description, status })

  responseHandler.success(request, response)
})

router.post('/delete', (request, response) => {
  const ids = request.body.ids || []

  databaseHandler.deleteByIds(ids)

  responseHandler.success(request, response)
})

router.get('/getPort', async (request, response) => {
  const port = await portHandler.getPort()

  responseHandler.success(request, response, { data: port })
})

router.get('/getProject', (request, response) => {
  const id = request.query.id
  const data = databaseHandler.findById(id)

  responseHandler.success(request, response, { data })
})

router.post('/switchConfig', (request, response) => {
  const { id, configId } = request.body

  const project = databaseHandler.findById(id)
  const oldSelectedConfig = project.configs.find(config => config.select)
  const newSelectedConfig = project.configs.find(config => config.id === configId)

  oldSelectedConfig.select = false
  newSelectedConfig.select = true

  databaseHandler.update(project)

  responseHandler.success(request, response, { data: project })
})

router.post('/start', async (request, response) => {
  const id = request.body.id
  const project = databaseHandler.findById(id)
  const config = project.configs.find(config => config.select)
  const json = JSON.parse(stripJsonComments(config.jsonString))

  if (project.status === SERVER_STATUS.STOP) {
    if (await portHandler.checkPort(project.port)) {
      await proxyHandler.start(id, project.port, json)

      project.status = SERVER_STATUS.RUNNING

      databaseHandler.update(project)
    } else {
      responseHandler.fail(request, response, { message: `${project.port} 端口被占用，请更换端口` })

      return
    }
  }

  responseHandler.success(request, response, { data: project })
})

router.post('/reload', (request, response) => { })

router.post('/stop', async (request, response) => {
  const id = request.body.id
  const project = databaseHandler.findById(id)

  await proxyHandler.stop(id)

  project.status = SERVER_STATUS.STOP

  databaseHandler.update(project)
  responseHandler.success(request, response, { data: project })
})

module.exports = router
