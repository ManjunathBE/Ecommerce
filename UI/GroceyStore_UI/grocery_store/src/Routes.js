import React from "react"
import { Route, Switch } from "react-router-dom"
import Home from './Home'
import Cart from './Cart'
import History from './History'
import Notification from './Notification'
import SelectView from './SelectView'
import UserProfile from './UserProfile'


export const Routes= ()=> (

    <div>
        <Switch>
            <Route exact path="/" component = {Home} />
            <Route path="/Cart" component = {Cart} />
            <Route path="/History" component = {History} />
            <Route path="/Notification" component = {Notification} />
            <Route path="/SelectView" component = {SelectView} />
            <Route path="/UserProfile" component = {UserProfile} /> 
        </Switch>
    </div>
);