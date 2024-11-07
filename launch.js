const path = require('node:path')
const { app, BrowserWindow, Menu, child_process } = require('electron/main')
const { launchDB } = require('./server/launch/launch_db');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(app.getAppPath(), 'preload.js'),
      contextIsolation: true
    }
  });
  const devtools = new BrowserWindow();
  win.webContents.setDevToolsWebContents(devtools.webContents);
  win.webContents.openDevTools({ mode: 'detach' });

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  launchDB(app);
  let myMenu = Menu.buildFromTemplate([
    // 菜单模板内容
  ]);
  // 设置菜单
  Menu.setApplicationMenu(myMenu);
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  myMenu = null;
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})