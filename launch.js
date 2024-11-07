const path = require('node:path')
const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const { spawn } = require('child_process');
const { launchDB } = require('./main/launch/launch_db');

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

ipcMain.on('start-server', (event) => {
  console.log('ipcMain start-serverf');
  const serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`子进程已退出，退出码 ${code}`);
  });
});