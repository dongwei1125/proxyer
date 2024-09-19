const { Tray, Menu } = require('electron/main')

const { trayIcon, trayToolTip } = require('../exe.config')

const menus = (app, win) => [
  {
    label: '显示',
    click: () => win.show(),
  },
  {
    label: '隐藏',
    click: () => win.hide(),
  },
  {
    label: '重启',
    click: () => {
      win.show()
      win.reload()
    },
  },
  {
    label: '退出',
    click: () => {
      win.destroy()
      app.quit()
    },
  },
]

function tray(app, win) {
  const tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate(menus(app, win))

  tray.setContextMenu(contextMenu)
  tray.setToolTip(trayToolTip)

  tray.on('click', () => win.show())
}

module.exports = tray
