import axios from 'axios';

const verifyMail = (req, res) => {

};

const insertMember = () => {
    const memberId = document.querySelector('#memberId');
    const memberPw = document.querySelector('#memberPw');
    const memberName = document.querySelector('#memberName');
    axios.post('/insertMember', {id: memberId.value, pw: memberPw.value, name: memberName.value})
    .then((res) => {
        alert('회원가입 완료.');
        // 메인페이지로 이동
    })
    .catch((err) => {
        console.log(err);
    });
};

const Join = () => {
    return (
        <div>
            <div>Join Page</div>
            <span>id: </span><input id='memberId' type="text"></input>
            <button onClick={verifyMail}>이메일 인증</button>
            <span>pw: </span><input id='memberPw' type="password"></input>
            <span>name: </span><input id="memberName" type='text'></input>
            <button onClick={insertMember}>회원가입</button>
        </div>
    );
};
export default Join;