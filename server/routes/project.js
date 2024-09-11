const { Router } = require('express')
const stripJsonComments = require('strip-json-comments')

const DBHandler = require('../handlers/DBHandler')
const ProxyHandler = require('../handlers/ProxyHandler')

const { getPort } = require('../utils/port')
const { sendSuccess } = require('../utils/send')
const { SERVER_STATUS } = require('../utils/const')

const router = Router()
const db = new DBHandler()
const proxy = new ProxyHandler()

router.get('/list', (request, response) => {
  const query = request.query
  const pageNo = Number(query.pageNo || 1)
  const pageSize = Number(query.pageSize || 10)

  const rows = db.values(pageNo, pageSize)
  const total = db.total()
  const data = { rows, total, pageNo, pageSize }

  sendSuccess(response, { data })
})

router.post('/create', (request, response) => {
  const { name, port, configs, description } = request.body
  const data = db.create({ name, port, configs, description, status: SERVER_STATUS.STOP })

  sendSuccess(response, { data })
})

router.post('/update', async (request, response) => {
  const { id, name, port, configs, description, status } = request.body

  if (status === SERVER_STATUS.RUNNING) await proxy.stop(id)

  const data = db.update({ id, name, port, configs, description, status: SERVER_STATUS.STOP })

  sendSuccess(response, { data })
})

router.post('/delete', async (request, response) => {
  const ids = request.body.ids || []
  const projects = db.findByIds(ids).filter(project => project.status === SERVER_STATUS.RUNNING)
  const stops = projects.map(project => proxy.stop(project.id))

  await Promise.allSettled(stops)

  db.deleteByIds(ids)

  sendSuccess(response)
})

router.get('/getPort', async (request, response) => {
  const data = await getPort()

  sendSuccess(response, { data })
})

router.get('/getProject', (request, response) => {
  const id = request.query.id
  const data = db.findById(id)

  sendSuccess(response, { data })
})

router.post('/switchConfig', async (request, response) => {
  const { id, configId } = request.body

  const project = db.findById(id)
  const oldSelectedConfig = project.configs.find(config => config.select)
  const newSelectedConfig = project.configs.find(config => config.id === configId)

  oldSelectedConfig.select = false
  newSelectedConfig.select = true

  if (project.status === SERVER_STATUS.RUNNING) {
    await proxy.stop(id)

    project.status = SERVER_STATUS.STOP
  }

  const data = db.update(project)

  sendSuccess(response, { data })
})

router.post('/start', async (request, response) => {
  const id = request.body.id
  const project = db.findById(id)
  const config = project.configs.find(config => config.select)
  const json = JSON.parse(stripJsonComments(config.jsonString))
  const { port, status } = project

  if (status === SERVER_STATUS.STOP) {
    await proxy.start(id, port, json)

    project.status = SERVER_STATUS.RUNNING
  }

  const data = db.update(project)

  sendSuccess(response, { data })
})

router.post('/reload', (request, response) => { })

router.post('/stop', async (request, response) => {
  const id = request.body.id
  const project = db.findById(id)

  await proxy.stop(id)

  project.status = SERVER_STATUS.STOP

  const data = db.update(project)

  sendSuccess(response, { data })
})

module.exports = router
