import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import BoardDto from "../dto/BoardDto";

const BoardDetail = () => {
    
    const { seq } = useParams();
    const [ board, setBoard ] = useState(BoardDto);

    const getBoard = async () => {
        const result = (await axios.get(`/getBoard/${seq}`));
        setBoard(result.data[0]);
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div>
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