const { join } = require('path')

module.exports = {
  preload: join(__dirname, './utils/preload.js'),
  trayIcon: join(__dirname, './logo.png'),
  trayToolTip: 'tray tooltip',
}
