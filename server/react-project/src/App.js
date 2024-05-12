import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './layout/Header';
import Menu from './layout/Menu';
import Home from './routes/Home';
import Join from './routes/Join';
import Login from './routes/Login';
import Board from './routes/Board';
import BoardDetail from './routes/BoardDetail';
import BoardWrite from './routes/BoardWrite';

const App = () => {

  const [ loginId, setLoginId ] = useState('');
  const [ reload, setReload ] = useState(false);

  const authCheck = async () => {
    const result = await axios.get('/authCheck');
    if (result.data.isLogined) setLoginId(result.data.loginId);
  };

  useEffect(() => {
      authCheck();
  }, [reload]);

  return (
    <>
      <Header loginId={loginId} setLoginId={setLoginId}/>
      <Menu/>
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Join" element={<Join />}></Route>
          <Route path="/Login" element={<Login reload={reload} setReload={setReload}/>}></Route>
          <Route path="/Board" element={<Board loginId={loginId}/>}></Route>
          <Route path="/Board/:seq" element={<BoardDetail loginId={loginId}/>}></Route>
          <Route path="/BoardWrite" element={<BoardWrite />}></Route>
      </Routes>
    </>
  );
};

export default App;
