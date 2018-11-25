// expressモジュールの読み込み
var express = require('express');
// Express 4.x系 ログをターミナルに表示してくれる
var logger = require('morgan');
// expressオブジェクトの作成
app = express();

/**
 * .use: middlewareと呼ぶ。書く順番が重要。
 */
// Express 4.x系では不要
// app.use(app.router);
// 静的ファイルをいちいちハンドリングするのがめんどくさいとき。
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
// middlewareを自作することも可能、functionを渡す。
app.use((req, res, next) => {
    console.log('My custom middleware');
    // nextを忘れない。middlewareは上から適用されなかったときに次のmiddlewareを適用する。
    // それをnext();という命令があることで実現されている。
    next();
});

// '/'でアクセスしてきたら実行
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about', (req, res) => {
    res.send('about this page');
});

// :hogeでプレースホルダーを付けられる。URLの一部を取得できる。
app.get('/users/:name', (req, res) => {
    res.send(`Hello! My name is... ${req.params.name}`);
});
// ?を付けるとオプショナル。
app.get('/users/:name?', (req, res) => {

    if (req.params.name) {
        res.send(`Hello! My name is... ${req.params.name}`);
    } else {
        res.send('Hello! My name is... Booooooyah!');
    }
});
// 正規表現も可能
app.get('/items/:id([0-9]+)', (req, res) => {
        res.send(`Item no... ${req.params.id}`);
});
// 静的ファイルを読み込む
app.get('/hello.txt', (req, res) => {
    res.sendfile(__dirname + '/public/hello.txt');
});

// port3000で待ち受け
app.listen(3000);
console.log('Server starting...');