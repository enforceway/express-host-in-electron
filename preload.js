const { contextBridge, ipcRenderer } = require('electron');
const { interactWithDB } = require('./server/interactions/operationQueue');
console.log('ipcRenderer:ipcRenderer:', ipcRenderer);
let idx = 0;
contextBridge.exposeInMainWorld('versions', {
    addUser: (bookmarkInstance) => {
        interactWithDB('db-operation', { operation: 'insert', data: { ...bookmarkInstance }})
    }
});
