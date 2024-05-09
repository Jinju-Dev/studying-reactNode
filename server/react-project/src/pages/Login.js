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
            if (data.length > 0) {
                console.log('회원가입 성공');
                navigate('/');
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