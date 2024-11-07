const { contextBridge, ipcRenderer } = require('electron');
const { interactWithDB } = require('../interactions/operationQueue');
console.log('ipcRenderer:ipcRenderer:', ipcRenderer);
// 有什么区别
// const { contextBridge } = require('electron')
let idx = 0;
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    addUser: (bookmarkInstance) => {
        interactWithDB('db-operation', { operation: 'insert', data: { id: idx++, name: bookmarkInstance.name }}).then(result => {
            alert(result);
        });
    }
    // ping: () => {
    //     // const pingRes = ipcRenderer.invoke('ping');
    //     // console.log(pingRes);
    //     return pingRes;
    // }
});

// 发送操作数据库的请求到主进程