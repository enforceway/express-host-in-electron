const express = require('express');
const app = express();

// 在 Express 应用中
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "connect-src 'self' http://localhost:3000");
    next();
});
app.get('/api/hello', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(3000, () => {
  console.log('Express 服务器正在运行，监听 3000 端口');
});