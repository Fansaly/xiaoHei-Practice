const fs = require('fs')

/**
 * reads the entire contents of a file
 */
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.open(file, 'r', (err, fd) => {
      if (err && err.code === 'ENOENT') {
        return reject({
          code: 'ENOENT',
          msg: 'does not exist'
        })
      }

      fs.readFile(fd, 'utf8', (err, data) => {
        if (err) {
          throw err
        }

        // resolve(Buffer.from(data, 'base64').toString('utf8'))
        resolve({
          code: 'SUCCESS',
          data
        })
      })
    })
  })
}

/**
 * writes data to a file
 */
const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.open(file, 'w', (err, fd) => {
      if (err && err.code === 'EACCES') {
        return reject({
          code: 'EACCES',
          msg: 'Permission denied'
        })
      }

      fs.writeFile(fd || file, data, 'utf8', (err) => {
        if (err) {
          throw err
        }

        resolve({
          code: 'SUCCESS',
          msg: 'write completed'
        })
      })
    })
  })
}

module.exports = { readFile, writeFile }
