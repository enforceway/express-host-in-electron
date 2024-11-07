const { ipcMain } = require('electron');
const DBOperationResult = require('./interaction_result_model');

// 在主进程中接收并处理请求
ipcMain.on('db-operation', (event, data) => {
    console.log('db-operation event:', event);
    
});

function db_operation(db, data) {
    return new Promise((resolve, reject) => {
        if (data.operation === 'insert') {
            db.run('INSERT INTO users VALUES (?,?)', [data.data.id, data.data.name], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(new DBOperationResult(true, '数据插入成功', null));
            });
        } else if (data.operation === 'select') {
            db.get('SELECT id, name FROM users', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(new DBOperationResult(true, '数据查询成功', rows));
            });
        }
    });
}

module.exports = {
    db_operation
};
