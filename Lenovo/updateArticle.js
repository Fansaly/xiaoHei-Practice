/**
 * update Article
 * ----------------------------
 * usage: node updateArticle.js
 * need `jsdom` module
 * ----------------------------
 */
require('../updateArticle')({
  url: 'https://www.tonymacx86.com/threads/guide-lenovo-z50-70-z40-70-using-clover-uefi.232823/',
  file: `${__dirname}/Lenovo.html`
})
