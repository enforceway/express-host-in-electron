
const { ipcMain } = require('electron');
const { ipcRenderer } = require('electron/main')
const { initDB } = require('../database/initdb');
const { db_operation } = require('../interactions/dbinteract');

let dbInstance;
let params;
// 在主进程中接收并处理请求
ipcMain.on('db-operation', (event, data) => {
    console.log('db-operation event:', event);
    params = data;
    db_operation(dbInstance, data).then(result => {
        event.reply('db-operation-result', result);
    }).reject(err => console.log(err));
});
// console.log('ipcRenderer:', ipcRenderer);
// ipcRenderer.on('db-operation-result', (event, reply) => {
//     console.log('db-operation-result: ', event, reply);
//     params.callback = params.callback || (() => {});
//     params.callback(event);
// });

function launchDB(app) {
    dbInstance = initDB(app);
    return dbInstance;
}

module.exports = { launchDB };
