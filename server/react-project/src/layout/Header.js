import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = (props) => {
    
    const { loginId, setLoginId } = props;

    const logout = async () => {

        await axios.get('/logout');
        setLoginId('');
    };

    return (
        <>
            { !!loginId 
                ? <div>{loginId}님<button onClick={logout}>로그아웃</button></div>
                : <div><Link to="/Login">로그인</Link><Link to="/Join">회원가입</Link></div>
            }
            
        </>
    );
}

export default Header;