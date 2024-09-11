const { existsSync, mkdirSync } = require('fs')
const { join } = require('path')
const { nanoid } = require('nanoid')
const lowdb = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const { dbDir, dbName } = require('../server.config')

if (!existsSync(dbDir)) mkdirSync(dbDir)

const adapter = new FileSync(join(dbDir, dbName), { defaultValue: { projects: [] } })
const db = lowdb(adapter)

class DBHandler {
  constructor() {
    this.db = db
  }

  /**
   * @param {Number} pageNo
   * @param {Number} pageSize
   * @returns {Array}
   */
  values(pageNo = 1, pageSize = 10) {
    const start = (pageNo - 1) * pageSize
    const end = start + pageSize

    return this.db.get('projects').slice(start, end).value()
  }

  /**
   * @returns {Number}
   */
  total() {
    return this.db.get('projects').value().length
  }

  /**
   * @param {Object} project
   * @returns {Object}
   */
  create(project) {
    const id = nanoid()

    this.db
      .get('projects')
      .unshift({ ...project, id })
      .write()

    return this.findById(id)
  }

  /**
   * @param {Object} project
   * @returns {Object}
   */
  update(project) {
    const id = project.id

    this.db.get('projects').find({ id }).assign(project).write()

    return this.findById(id)
  }

  /**
   * @param {Array} ids
   */
  deleteByIds(ids = []) {
    this.findByIds(ids).forEach(({ id }) => {
      this.db.get('projects').remove({ id }).value()
    })
    this.db.write()
  }

  /**
   * @param {String} id
   * @returns {Object}
   */
  findById(id) {
    return this.db.get('projects').find({ id }).value()
  }

  /**
   * @param {Array} ids
   * @returns {Array}
   */
  findByIds(ids = []) {
    return this.db
      .get('projects')
      .filter(project => ids.includes(project.id))
      .value()
  }
}

module.exports = DBHandler
