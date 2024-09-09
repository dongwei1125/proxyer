const { existsSync, mkdirSync } = require('fs')
const { join } = require('path')
const lowdb = require('lowdb')
const { nanoid } = require('nanoid')

const FileSync = require('lowdb/adapters/FileSync')

const { dbDir, dbFilename } = require('../server.config')

if (!existsSync(dbDir)) {
  mkdirSync(dbDir)
}

const adapter = new FileSync(join(dbDir, dbFilename), { defaultValue: { projects: [] } })
const database = lowdb(adapter)

class DatabaseHandler {
  constructor() {
    this.database = database
  }

  getData(pageNo = 1, pageSize = 10) {
    const start = (pageNo - 1) * pageSize
    const end = start + pageSize

    return this.database.get('projects').slice(start, end).value()
  }

  getTotal() {
    return this.database.get('projects').value().length
  }

  create(project) {
    this.database
      .get('projects')
      .push({ ...project, id: nanoid() })
      .write()
  }

  update(project) {
    this.database.get('projects').find({ id: project.id }).assign(project).write()
  }

  deleteByIds(ids = []) {
    this.findByIds(ids).forEach(({ id }) => {
      this.database.get('projects').remove({ id }).value()
    })
    this.database.write()
  }

  findById(id = '') {
    return this.database.get('projects').find({ id }).value()
  }

  findByIds(ids = []) {
    return this.database
      .get('projects')
      .filter(project => ids.includes(project.id))
      .value()
  }
}

module.exports = DatabaseHandler
