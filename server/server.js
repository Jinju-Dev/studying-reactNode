import express from 'express';
import mysql from 'mysql';
import db from './config/database.js';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';

const app = express();
const connection = mysql.createConnection(db);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use(express.json()); // post 요청 시 body로 받을 때 추가해주어야한다.
app.use(session({
    secure: true, // 보안을 위한 https으로 통신하기 위해 추가
    secret: 'keyboard cat', // id 값 
    resave: false, // 세션 데이터가 변화가 있을 때에만 저장(true일 경우 계속 저장)
    saveUninitialized: true, // 세션이 필요하기 전까지는 세션을 구동하지 않음(false일 경우 세션을 구동)
}));

// 인터셉터 처리
app.use(['/BoardNew','/BoardEdit:seq', '/writeBoard', '/deleteBoard', '/editBoard'], (req, res) => {
    if (!req.session.isLogined) res.redirect('/Login');
})

app.get('/authcheck', (req, res) => {
    if (!!req.session.isLogined) {
        res.send({
            'isLogined': req.session.isLogined,
            'loginId': req.session.loginId
        });
    } else {
        res.send({
            'isLogined': req.session.isLogined
        }); 
    }
});

// 회원가입
app.post('/insertMember', (req, res) => {
    const { body } = req;
    const sql = `insert into member(id, pw, name) values (?, ?, ?)`;
    const param = [body.id, body.pw, body.name]
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 로그인
app.post('/checkMember', (req, res) => {
    const { body } = req;
    const sql = `select id from member where id = ? and pw = ?`;
    const param = [body.id, body.pw];
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        if (result.length > 0) { // 로그인 성공 
            req.session.isLogined = true;
            req.session.loginId = body.id;
            res.send('login success');
        } else { // 로그인 실패
            res.send('login fail');
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('logout');
})

// 게시판 조회
app.get('/getBoardList', (req, res) => {
    const sql = `select * from board`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// 게시글 조회
app.get('/getBoard/:seq', (req, res) => {
    const { params } = req;
    const sql = `select * from board where seq = ?`;
    const param = [params.seq];
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// 게시글 작성
app.post('/writeBoard', (req, res) => {
    const { body } = req;
    const sql = `insert into board(title, content, writer) values (?, ?, ?)`;
    const param = [body.title, body.content, req.session.loginId];
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

// 게시글 삭제
app.get('/deleteBoard', (req, res) => {
    const params = req.query;
    const sql = `delete from board where seq = ?`;
    const param = [params.seq];
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.send('delete success');
    })
});

// 게시글 수정
app.post('/editBoard', (req, res) => {
    const { body } = req;
    const sql = `update board set title = ?, content = ? where seq = ?`;
    const param = [body.title, body.content, body.seq];
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.send('edit success');
    });
})

app.listen(8080, () => {
    console.log('listening on 8080');
});

// 리액트 라우터 사용
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'react-project/build/index.html')); 
});