import axios from 'axios';

const checkMember = () => {
    const memberId = document.querySelector('#memberId');
    const memberPw = document.querySelector('#memberPw');
    axios.post('/checkMember', {id: memberId.value, pw: memberPw.value})
    .then((res) => {
        const data = res.data;
        if (data.length > 0) {
            alert('로그인 성공');
            // 메인페이지로 이동
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

const Login = () => {
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