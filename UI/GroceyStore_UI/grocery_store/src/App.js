import React, {useState} from 'react';
import './App.css';
import { Routes } from './Routes'
import { AuthContext } from "./Auth";
import Footer from './Footer'


function App() {
  const [loginState, setLoginState] = useState(false)
  console.log(loginState, 'login state')
  return (
    <AuthContext.Provider value={{loginState, setLoginState}}>
     {/* <AuthContext.Provider value={true}> */}
    <div >

      <Routes />
      <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
