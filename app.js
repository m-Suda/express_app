// expressモジュールの読み込み
var express = require('express');
// Express 4.x系 ログをターミナルに表示してくれる
var logger = require('morgan');
// body-parserモジュールの読み込み。
var bodyParser = require('body-parser');

// expressオブジェクトの作成
app = express();

/**
 * テンプレート関係
 */
// どのディレクトリか。
app.set('views', __dirname + '/views');
// どのテンプレートエンジンを使用するか。
app.set('view engine', 'ejs');

/**
 * .use: middlewareと呼ぶ。書く順番が重要。
 */
// Express 4.x系では不要
// app.use(app.router);
// 静的ファイルをいちいちハンドリングするのがめんどくさいとき。
// body-parserのjson
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
// middlewareを自作することも可能、functionを渡す。
// app.use((req, res, next) => {
//     console.log('My custom middleware');
//     // nextを忘れない。middlewareは上から適用されなかったときに次のmiddlewareを適用する。
//     // それをnext();という命令があることで実現されている。
//     next();
// });

// パラメータに対して共通の処理をしたい。プレースホルダーの値を元に別の値にしたい場合。(ここではidを例)
app.param('id', (req, res, next, id) => {
    var users = ['hoge', 'fuga', 'piyo'];
    req.params.name = users[id];
    next();
});
app.get('/hello/:id', (req, res) => {
    // res.send(`Hello!... ${req.params.id}`);
    res.send(`Hello!... ${req.params.name}`);
});
app.get('/bye/:id', (req, res) => {
    // res.send(`GoodBye!... ${req.params.id}`);
    res.send(`GoodBye!... ${req.params.name}`);
});

// getだけではなくpostでもできる。※body-parserモジュールが必要になる。詳細は↑
app.get('/new', (req, res) => {
    res.render('new');
});
app.post('/create', (req, res) => {
    // postなのでbodyの中に値が入ってくる。
    console.log(req.body);
    res.send(req.body.name);
});

// テンプレートを使用する場合。
app.get('/', (req, res) => {
    res.render('index', {title: 'this is title'});
});
// '/'でアクセスしてきたら実行
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
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