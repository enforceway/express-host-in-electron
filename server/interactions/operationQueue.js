const { ipcRenderer } = require('electron')

let idx = 0;

function interactWithDB(operationType, data) {
  ipcRenderer.send('db-operation', { operation: operationType, data: { id: idx++, ...data } });
};


module.exports = {
  interactWithDB,
  operationType: {
    INSERT: 'insert',
    SELECT: 'select',
    DELETE: 'delete',
    UPDATE: 'update'
  }
};
