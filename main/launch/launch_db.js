
const { ipcMain } = require('electron');
const ipcRenderer = require('electron').ipcRenderer
const { initDB } = require('../database/initdb');
const { db_operation } = require('../interactions/dbinteract');

let dbInstance;
let params;
// 在主进程中接收并处理请求
ipcMain.on('db-operation', (event, data) => {
    params = data;
    db_operation(dbInstance, data).then(result => {
        event.reply('db-operation-result', result);
    }).catch(err => console.log(err));
});

function launchDB(app) {
    dbInstance = initDB(app);
}

module.exports = { launchDB };
