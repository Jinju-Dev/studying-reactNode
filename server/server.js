import express from 'express';
import mysql from 'mysql';
import db from './config/database.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const connection = mysql.createConnection(db);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'react-project/build')));
app.use(express.json()); // post 요청 시 body로 받을 때 추가해주어야한다.

app.listen(8080, () => {
    console.log('listening on 8080');
});

// 회원가입
app.post('/insertMember', (req, res) => {
    const body = req.body;
    const sql = `insert into member(id, pw, name) values (?, ?, ?)`;
    const param = [body.id, body.pw, body.name]
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 로그인
app.post('/checkMember', (req, res) => {
    const body = req.body;
    const sql = `select id from member where id = ? and pw = ?`;
    const param = [body.id, body.pw];
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

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
    const params = req.params;
    const sql = `select * from board where seq = ?`;
    const param = [params.seq];
    connection.query(sql, param, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// 리액트 라우터 사용(최하단에 작성)
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'react-project/build/index.html')); 
});