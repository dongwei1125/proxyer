const { homedir } = require('os')
const { join } = require('path')

module.exports = {
  port: 8800,
  dbDir: join(homedir(), '.proxyer'),
  dbFilename: 'db.json',
}
