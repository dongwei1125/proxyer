const express = require('express')
const { join } = require('path')
const { cyan } = require('chalk')
const { program } = require('commander')
const detectPort = require('detect-port')

const { createPromise } = require('./utils')
const projectRouter = require('./routes/project')
const config = require('./server.config')

const app = express()
const { promise, resolve } = createPromise()
const option = program.option('-p, --port <number>', 'port number', config.port)
const opts = option.parse(process.argv).opts()

app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

app.use('/api/project', projectRouter)

async function main() {
  const port = await detectPort(opts.port)

  app.listen(port, () => {
    console.log()
    console.log('  Express server started on:')
    console.log(`  - Local:   ${cyan(`http://localhost:${port}/`)}`)
    console.log()

    resolve(port)
  })
}

main()

module.exports = promise
