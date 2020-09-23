import React, { Component } from "react";
import {Header} from './Header'

export const  Notification =(props)=> {
        return (
            <div>
                <Header title={(props.location.pathname).substring(1)} history={props.history}/>
                This is Notification page
            </div>
        )
    }
