// const { ipcMain } = require('electron');
const DBOperationResult = require('./interaction_result_model');

function db_operation(db, data) {
    return new Promise((resolve, reject) => {
        if (data.operation === 'insert') {
            db.serialize(() => {
                // 开启事务
                db.run('BEGIN TRANSACTION');
                // 执行一些数据库操作
                db.run('INSERT INTO users(name, url) VALUES (?,?)', [data.data.name, data.data.url], (err) => {
                    if (err) {
                        db.rollback(() => {
                            console.error('更新操作失败，已回滚事务：', err);
                        });
                        reject(err);
                        return;
                    }
                    // 提交事务
                    db.run('COMMIT');
                    resolve(new DBOperationResult(true, '数据插入成功', null));
                });
            });
        } else if (data.operation === 'select') {
            db.all('SELECT id, name, url FROM users', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                const isObject = rows.toString().toLowerCase();
                resolve(new DBOperationResult(true, '数据查询成功', rows));
            });
        }
    });
}

module.exports = {
    db_operation
};
