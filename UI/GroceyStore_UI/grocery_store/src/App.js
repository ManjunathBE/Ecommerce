import React, { useState } from 'react';
import './App.css';
import { Routes } from './Routes'
import { AuthContext } from "./Auth";
import Footer from './Footer'
import { Hidden } from '@material-ui/core';
import {MenuPane} from './MenuPane'




function App() { 

  const [loginState, setLoginState] = useState(false)
  console.log(loginState, 'login state')
  return (
    <AuthContext.Provider value={{ loginState, setLoginState }}>
      {/* <AuthContext.Provider value={true}> */}
      <div >
        <Routes />
        <Hidden mdUp >
          <Footer />
        </Hidden>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
