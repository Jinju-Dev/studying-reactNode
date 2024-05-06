import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Join from './pages/Join';
import Login from './pages/Login';
import Board from './pages/Board';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/Join" element={<Join />}></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Board" element={<Board />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;