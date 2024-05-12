import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BoardComponent = (props) => {
    
    const navigate = useNavigate();
    const { isEdit, seq } = props;
    
    const writeBoard = async () => {

        const title = document.querySelector('#title');
        const content = document.querySelector('#content');
        
        await axios.post('/writeBoard', {title: title.value, content: content.value})
        .then((res) => {
            const { insertId } = res.data;
            navigate(`/board/${insertId}`);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    const getBoard = async () => {

        const title = document.querySelector('#title');
        const content = document.querySelector('#content');

        const result = await axios.get(`/getBoard/${seq}`);
        title.value = result.data[0].title;
        content.value = result.data[0].content;
    };

    const editBoard = async () => {

        const title = document.querySelector('#title');
        const content = document.querySelector('#content');

        await axios.post('/editBoard', {seq: seq, title: title.value, content: content.value})
        .then((res) => {
            if (res.data === 'edit success') {
                navigate(`/board/${seq}`);
            } else {
                alert('게시글을 수정하지 못했습니다.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        if (!!seq) getBoard();
    }, seq);

    return (
        <>
            <span>제목: </span><input type="text" id="title"></input><br/>
            <span>내용: </span><input type="text" id="content"></input>
            { isEdit
                ? <button onClick={editBoard}>수정하기</button>
                : <button onClick={writeBoard}>글쓰기</button>
            }
        </>
    );

};

export default BoardComponent;