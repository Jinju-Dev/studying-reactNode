import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const navigate = useNavigate();

    const insertMember = async () => {

        const memberId = document.querySelector('#memberId');
        const memberPw = document.querySelector('#memberPw');
        const memberName = document.querySelector('#memberName');
        
        await axios.post('/insertMember', {id: memberId.value, pw: memberPw.value, name: memberName.value})
        .then((res) => {
            alert('회원가입 완료.');
            navigate(-1);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <div>Join Page</div>
            <span>id: </span><input id='memberId' type="text"></input>
            <span>pw: </span><input id='memberPw' type="password"></input>
            <span>name: </span><input id="memberName" type='text'></input>
            <button onClick={insertMember}>회원가입</button>
        </div>
    );
};
export default Join;