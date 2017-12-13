/**
 * relative path
 */
const path = require('path')

module.exports = (file) => {
  let fileAlias = path.relative(process.cwd(), file)

  if (fileAlias.indexOf(file) > 0) {
    fileAlias = file
  }

  return fileAlias
}
