import {Link} from 'react-router-dom';

const Menu = () => {
    
    return (
        <div>
            <Link to="/">홈</Link>
            <Link to="/Board">게시판</Link>
        </div>
    )
};

export default Menu;