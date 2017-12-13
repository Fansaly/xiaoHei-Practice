const colors = require('./colors.js')

module.exports = (color, msg, overlay) => {
  console.log(`${colors[color]}%s${colors.Color_Off}`, msg)

  if (!!overlay) {
    console.log(`\u001B[1F\u001B[1G${overlay}`)
  }

  return
}
