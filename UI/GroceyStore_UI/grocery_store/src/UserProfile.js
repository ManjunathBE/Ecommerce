import React, { Component } from "react"
import {Header} from './Header'


export const UserProfile =(props)=> {

        return (
            <div>
                <Header title={(props.location.pathname).substring(1)} history={props.history}/>
               You are in User Profile page
            </div>
        )
    }

