import React from "react"
import Login from "./component/Login";
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import SearchBox from './components/SearchBox';
import Landing from './pages/landingpage';
import ViewInfo from './pages/viewinfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addtocart from "./pages/addtocartpage";

function App() {
  return (
    <div className="bg-light">
     {/* <Landing/> */}
     {/* <Outlet/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Landing/>}></Route>       
        <Route path='/viewinfo/:id' element={<ViewInfo/>}></Route>
        <Route path='/cart' element={<Addtocart/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
