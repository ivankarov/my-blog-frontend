import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Register from './pages/Register';
import './App.css';

function App() {
  return(
    <Router>
      <div className="App">
        <Navbar/> 
        <Routes>
          <Route path="/" element={<h1 style={{padding:'2rem'}}>Welcome to My Blog!</h1>}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/auth/registration" element={<Register/>}/>
        </Routes>
      </div>
    </Router> 
  );
}
export default App;