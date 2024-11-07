const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

function databasePath(app) {
    const userDataPath = app.getPath('userData');
    return userDataPath;
};

function initDB(app) {
    // 初始化数据库
    db = new sqlite3.Database(path.join(databasePath(app), 'electron-test-startup.db'));
    // 在此处进行数据库操作
    db.run('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, name TEXT)');
    return db;
};
module.exports = { initDB };