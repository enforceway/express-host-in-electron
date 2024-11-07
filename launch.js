const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('path');
const { launchDB } = require('./server/launch/launch_db');
const createWindow = () => {
  console.log(path.join(__dirname, 'preloading.js'));
  const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preloading.js')
      }
    });
    win.loadFile('index.html')
};

app.whenReady().then(() => {
    const db = launchDB(app);

    // db.get('SELECT * FROM users', function(err, row) {
    //     if (err) {
    //         console.log('err:', err);
    //     } else {
    //         console.log('rows:', row);
    //     }
    // });
    console.log('数据插入开始：');
    db.run('INSERT INTO users VALUES (?,?)', [1, 'enfo'], (err) => {
      if (err) {
          reject(err);
          return;
      }
      console.log("数据插入结果：". err);
    });

    createWindow();

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
