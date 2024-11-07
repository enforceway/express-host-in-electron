// const { ipcMain } = require('electron');
const DBOperationResult = require('./interaction_result_model');

function db_operation(db, data) {
    return new Promise((resolve, reject) => {
        if (data.operation === 'insert') {
            db.run('INSERT INTO users(id, name, url) VALUES (?,?,?)', [data.data.id, data.data.name, data.data.url], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                db.close();
                resolve(new DBOperationResult(true, '数据插入成功', null));
            });
        } else if (data.operation === 'select') {
            db.all('SELECT id, name, url FROM users', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                db.close();
                const isObject = rows.toString().toLowerCase();
                resolve(new DBOperationResult(true, '数据查询成功', isObject === '[object object]' ? [rows]: rows));
            });
        }
    });
}

module.exports = {
    db_operation
};
