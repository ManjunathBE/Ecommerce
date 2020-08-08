import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home'
import {Routes} from './Routes'
import Header from './Header'
import Footer from './Footer'


function App() {
  return (
    <div >
      <Header/>
     <Routes/>
     <Footer/>
    </div>
  );
}

export default App;
