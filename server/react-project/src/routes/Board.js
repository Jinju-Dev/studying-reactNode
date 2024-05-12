import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BoardDto from '../dto/BoardDto'

const Board = (props) => {
    
    const { loginId } = props;
    const [ boardList, setBoardList ] = useState([BoardDto]);

    const getBoardList = async () => {
        const result = await axios.get('/getBoardList');
        setBoardList(result.data);
    };
    
    useEffect(() => {
        getBoardList();
    }, []);


    return (
        <div>
            { !!loginId ? <Link to="/BoardWrite" ><button>글쓰기</button></Link> : '' }    
            <table>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                    <th>수정일자</th>
                </tr>
                { boardList.length > 0 ? boardList.map((board) => (
                    <tr>
                        <td>{board.seq}</td>
                        <td key={board.seq}><Link to={`/Board/${board.seq}`}>{board.title}</Link></td>
                        <td>{board.writer}</td>
                        <td>{board.insert_dt}</td>
                        <td>{board.update_dt}</td>
                    </tr>
                )): <tr><td colSpan={5}>데이터가 없습니다</td></tr>}
            </table>
        </div>
    );
};

export default Board;