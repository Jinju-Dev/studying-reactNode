import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {

    const navigate = useNavigate();

    const writeBoard = async () => {

        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;

        await axios.post('/writeBoard', {title: title, content: content})
        .then((res) => {
            const { insertId } = res.data;
            navigate(`/board/${insertId}`);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <span>제목: </span><input type="text" id="title"></input><br/>
            <span>내용: </span><input type="text" id="content"></input>
            <button onClick={writeBoard}>글쓰기</button>
        </>
    );
};

export default BoardWrite;