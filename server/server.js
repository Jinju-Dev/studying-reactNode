import express from 'express';
import mysql from 'mysql';
import db from './config/database.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const connection = mysql.createConnection(db);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(8080, () => {
    console.log('listening on 8080')
});

app.use(express.static(path.join(__dirname, 'react-project/build')));


// 빌드한 화면 return 
app.get('/', (req, res) => {
    req.sendFile(path.join(__dirname, 'react-project/build/index.html'));
})

// 데이터 조회
app.get('/member', (req, res) => {
    connection.query('select * from member', (err, results, fields) => {
        if (err) throw err;
        console.log(results);
        res.json(results);
    })
});
app.get('/product', (req, res) => {
    res.json({name : 'black shoes'});
})

// 리액트 라우터 사용(최하단에 작성)
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'react-project/build/index.html')); 
})