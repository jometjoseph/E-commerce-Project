import React from "react"
import Login from "./component/Login";
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import SearchBox from './components/SearchBox';
import Landing from './pages/landingpage';
import ViewInfo from './pages/viewinfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
     {/* <Landing/> */}
     {/* <Outlet/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Landing/>}></Route>       
        <Route path='/viewinfo/:id' element={<ViewInfo/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
