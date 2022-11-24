import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PessoaBox from "./Components/Pessoa";
import Login from "./Components/Login";
import useToken from './Components/Login/useToken';
import PresencaBox from './Components/Presenca';
import PresencasBox from './Components/presencas';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route path="pessoa" element={<PessoaBox />} />
          <Route path="login" element={<Login setToken={setToken}/>} />
          <Route path="presenca/:id" element={<PresencaBox/>}/>
          <Route path="presencas" element={<PresencasBox/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
