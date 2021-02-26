import React, { useState } from 'react';
import './App.css';
import { Routes } from './Routes'
import { AuthContext } from "./Auth";
import { Header } from "./Header";
import { Hidden } from '@material-ui/core';
import { MenuPane } from './MenuPane'
import firebaseConfig from './firebaseConfig';
import firebase from "@firebase/app";
import { withRouter } from 'react-router-dom'




function App(props) {

  const [loginState, setLoginState] = useState(false)
  console.log(loginState, 'login state')
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  return (
    <AuthContext.Provider value={{ loginState, setLoginState }}>
      {/* <AuthContext.Provider value={true}> */}
      <div >
        
        {loginState?
        <Header history={props.history} />:""}
        <Routes />

      </div>
    </AuthContext.Provider>
  );
}

export default withRouter(App);
