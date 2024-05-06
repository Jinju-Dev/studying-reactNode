import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to="/Login">로그인</Link>
            <Link to="/Join">회원가입</Link>
        </div>
    );
}

export default Header;