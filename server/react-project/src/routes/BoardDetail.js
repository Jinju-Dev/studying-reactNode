import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import BoardDto from "../dto/BoardDto";

const BoardDetail = (props) => {

    const navigate = useNavigate();
    const { loginId } = props
    const { seq } = useParams();
    const [ board, setBoard ] = useState(BoardDto);

    const getBoard = async () => {
        const result = await axios.get(`/getBoard/${seq}`);
        setBoard(result.data[0]);
    };

    const updateBoard = () => {

    };

    const deleteBoard = async () => {
        const result = await axios.get('/deleteBoard', {params: {seq: board.seq}}, {withCredentials: true});
        if (result.data === 'delete success') {
            navigate('/board');
        } else {
            alert('게시글을 삭제하지 못했습니다.');
        }
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div>
            { loginId === board.writer 
                ? (<><button onClick={ updateBoard }>수정</button><button onClick={ deleteBoard }>삭제</button></>)
                : ''
            }
            <div>글번호: { board.seq }</div>
            <div>제목: { board.title }</div>
            <div>내용: { board.content } </div>
            <div>작성자: { board.writer }</div>
            <div>작성일: { board.insert_dt }</div>
            <div>수정일: { board.update_dt }</div>
        </div>
    );
};

export default BoardDetail;