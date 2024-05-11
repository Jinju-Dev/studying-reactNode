import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    
    const navigate = useNavigate();

    const checkMember = () => {
        const memberId = document.querySelector('#memberId');
        const memberPw = document.querySelector('#memberPw');
        
        axios.post('/checkMember', {id: memberId.value, pw: memberPw.value})
        .then((res) => {
            const data = res.data;
            if (data.length === 'login success') {
                console.log('로그인 성공');
                navigate('/');
            } else {
                memberId.value = '';
                memberPw.value = '';
                alert('아이디 또는 비밀번호를 확인해주세요.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <div>Login Page</div>
            <span>id: </span><input id="memberId" type="text"></input>
            <span>pw: </span><input id="memberPw" type="text"></input>
            <button onClick={checkMember}>login</button>
        </div>
    );
};

export default Login;