/**
 * update Article
 * ----------------------------
 * usage: node updateArticle.js
 * need `jsdom` module
 * ----------------------------
 */
require('../updateArticle')({
  url: 'https://www.tonymacx86.com/threads/skylake-x-x299-live-the-future-now-on-macos-high-sierra-10-13-successful-build-extended-guide.229353/',
  file: `${__dirname}/Strix.html`
})
