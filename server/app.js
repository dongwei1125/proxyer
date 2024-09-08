const express = require('express')
const path = require('path')
const chalk = require('chalk')
const { program } = require('commander')

const projectRouter = require('./routes/project')
const { PORT } = require('./server.config')

const app = express()
const opts = program.option('-p, --port <number>', 'port number', PORT).parse(process.argv).opts()
const port = opts.port

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/project', projectRouter)

app.listen(port, () => {
  console.log()
  console.log('  Express server started on:')
  console.log(`  - Local:   ${chalk.cyan(`http://localhost:${port}/`)}`)
})
