const express = require('express')
const path = require('path')
const chalk = require('chalk')
const { program } = require('commander')

const projectRouter = require('./routes/project')

const app = express()
const { port } = program.option('-p, --port <number>', 'port number', 8800).parse(process.argv).opts()

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/project', projectRouter)

app.listen(port, () => {
  console.log(
    '\n\nServer started on:\n' + '  - Local: ' + chalk.blueBright(`http://localhost:${port}/`) + '\n\n\n',
  )
})
