// expressモジュールの読み込み
var express = require('express');
// expressオブジェクトの作成
app = express();

// Express 4.x系では不要
// app.use(app.router);

// '/'でアクセスしてきたら実行
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about', (req, res) => {
    res.send('about this page');
});

// port3000で待ち受け
app.listen(3000);
console.log('Server starting...');