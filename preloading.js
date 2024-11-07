console.log('ipcRenderer:eeee');
const { contextBridge, ipcRenderer } = require('electron');
const { interactWithDB } = require('./server/interactions/operationQueue');
let idx = 0;
contextBridge.exposeInMainWorld('api', {
    addUser: () => {
        console.log('addusers');
        // 发送操作数据库的请求到主进程
        // ipcRenderer.send('db-operation', { operation: 'insert', data: { id: 1, name: 'John' } });
    }
});

// 发送操作数据库的请求到主进程