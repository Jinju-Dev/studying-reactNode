import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Join from './pages/Join';
import Login from './pages/Login';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardWrite from './pages/BoardWrite';


const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/Join" element={<Join />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Board" element={<BoardList />}></Route>
                <Route path="/Board/:seq" element={<BoardDetail />}></Route>
                <Route path="/BoardWrite" element={<BoardWrite />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;