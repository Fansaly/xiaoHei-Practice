/**
 * module to update the article
 * --------------------------------------------
 * @param {string} url online document url
 * @param {string} file local output file path
 * --------------------------------------------
 * need `jsdom` module
 * --------------------
 */
const https = require('https')
const log = require('./log.js')
const update = require('./update.js')

log('Yellow', 'Please wait patiently...')

module.exports = ({ url, file }) => {
  https.get(url, (res) => {
    let html = ''

    res.on('data', (chunk) => {
      html += chunk
    })

    res.on('end', () => {
      html = html.replace(/>[^<\S]+</g, '><')
      update(file, html)
    })
  }).on('error', (e) => {
    log('Red', e)
  })
}
