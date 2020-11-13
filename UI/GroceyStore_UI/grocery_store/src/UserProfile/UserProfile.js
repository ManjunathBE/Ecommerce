import React, { Component } from "react"
import {Header} from '../Header'
import {Address} from './Address'


export const UserProfile =(props)=> {

        return (
            <div>
                <Header title={(props.location.pathname).substring(1)} history={props.history}/>
               You are in User Profile page
               <Address/>
            </div>
        )
    }

