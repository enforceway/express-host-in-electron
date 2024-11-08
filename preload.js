
const { contextBridge, ipcRenderer } = require('electron');
// const { operationType } = require('server/interactions/operationQueue');
const { port1, port2 } = new MessageChannel();

let callback;
ipcRenderer.on('db-operation-result', (result, data) => {
  callback(data);
});
let idx = 8;
ipcRenderer.send('start-server');
contextBridge.exposeInMainWorld('versions', {
    addUser: (data, callbackFn) => {
      callback = callbackFn || (() => {});
      ipcRenderer.send('db-operation', { id: ++idx, operation: 'insert', data: { ...data } });
    },
    getUsers: (data, callbackFn) => {
      callback = callbackFn || (() => {});
      ipcRenderer.send('db-operation', { id: ++idx, operation: 'select', data: data });
    }
});
