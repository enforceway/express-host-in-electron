const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { launchDB } = require('./server/launch/launch_db');
const { db_operation } = require('./server/interactions/dbinteract');

// 在主进程中接收并处理请求
// ipcMain.on('db-operation', (event, data) => {
//   console.log('db-operation event:', event);
//   params = data;
//   db_operation(dbInstance, data).then(result => {
//       event.reply('db-operation-result', result);
//   }).catch(err => console.log(err));
// });

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  });
  const devtools = new BrowserWindow();
  win.webContents.setDevToolsWebContents(devtools.webContents);
  win.webContents.openDevTools({ mode: 'detach' });

  win.loadFile('index.html')
}

app.whenReady().then(() => {
    const db = launchDB(app);
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})