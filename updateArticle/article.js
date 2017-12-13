const log = require('./log.js')

try {
  require.resolve('jsdom')
} catch(e) {
  log('Red', '`jsdom` module is not found.')
  process.exit(e.code)
}

const { JSDOM } = require('jsdom')

/**
 * Convert the required HTML string content to JavaScript objects
 */
module.exports = (html) => {
  const article = {}

  // get the document element by created DOM
  const document = (new JSDOM(html)).window.document

  // article related DOM
  const content = document.querySelectorAll('#messageList .message')[0]

  if (!content) {
    return { error: 'invalid HTML Document' }
  }

  const author = content.querySelector('.username')
  const createDateTime = content.querySelector('.muted .DateTime')
  const updateDateTime = content.querySelector('.editDate .DateTime')

  // article title
  article.title = document.querySelector('.titleBar h1').textContent

  // author info
  article.author_name = author.textContent
  article.author_url = author.href

  // create date-time
  article.createDateTime = createDateTime.textContent

  // update date-time
  if (updateDateTime) {
    // article.updateDateTime = updateDateTime.title
    article.updateDateTime = ''
      + updateDateTime.getAttribute('data-datestring')
      + ' at '
      + updateDateTime.getAttribute('data-timestring')
    article.updateDateTimeUTC = +updateDateTime.getAttribute('data-time')
  } else {
    article.updateDateTime = article.updateDateTimeUTC = 0
  }

  // the content to save to file
  const HTML = ''
    + `<div>`
    +     `<div class="titleBar">`
    +         `<h1>${article.title}</h1>`
    +     `</div>`
    +     `<ol id="messageList">`
    +         `<li class="message">${content.innerHTML}</li>`
    +     `</ol>`
    + `</div>`
  // article.content = Buffer.from(HTML).toString('base64')
  article.content = HTML

  return article
}
