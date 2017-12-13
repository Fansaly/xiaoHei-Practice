/**
 * update the local file if online is newer than it
 */
const log = require('./log.js')
const article = require('./article.js')
const relativePath = require('./relativePath.js')
const { readFile, writeFile } = require('./fileIO.js')

const update = (file, html) => {
  // online
  const newerArticle = article(html)
  const content = newerArticle.content

  // relative path
  const fileAlias = relativePath(file)

  readFile(file).then((data) => {
    // local file
    const olderArticle = article(data.data)

    if (olderArticle.error) {
      // invalid HTML Document
      log('Red', `${fileAlias}: ${olderArticle.error}.`, `${fileAlias}:`)

      const msg = 'has been updated'

      _writeFile({file, content, fileAlias, msg})
    } else if (newerArticle.updateDateTimeUTC > olderArticle.updateDateTimeUTC) {
      // newer
      const msg = 'has been updated'

      _writeFile({file, content, fileAlias, msg})
    } else {
      // no difference
      log('Green', `${fileAlias}: is up-to-date.`, `${fileAlias}:`)
    }
  }).catch((error) => {
    // file does not exist
    // log('Red', `${fileAlias}: ${error.msg}.`, `${fileAlias}:`)
    const msg = 'has been created'

    _writeFile({file, content, fileAlias, msg})
  })
}

const _writeFile = ({file, content, fileAlias, msg}) => {
  writeFile(file, content).then((data) => {
    // log('Green', `${fileAlias}: ${data.msg}.`, `${fileAlias}:`)
    log('Green', `${fileAlias}: ${msg}.`, `${fileAlias}:`)
    console.log('\033[0;36mType \033[0;35m`git diff` \033[0;36mto check for differences.')
  }).catch((error) => {
    log('Red', `${fileAlias}: ${error.msg}.`, `${fileAlias}:`)
  })
}

module.exports = update
