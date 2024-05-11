import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Join from './routes/Join';
import Login from './routes/Login';
import BoardList from './routes/BoardList';
import BoardDetail from './routes/BoardDetail';
import BoardWrite from './routes/BoardWrite';
const App = () => {
  
  return (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Join" element={<Join />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Board" element={<BoardList />}></Route>
        <Route path="/Board/:seq" element={<BoardDetail />}></Route>
        <Route path="/BoardWrite" element={<BoardWrite />}></Route>
    </Routes>
  );
};

export default App;
