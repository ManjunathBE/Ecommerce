import React, { Component } from "react";
import {Header} from './Header'

export const History =(props)=> {


        return (
            <div>
                <Header title={(props.location.pathname).substring(1)} history={props.history} />
                This is History page
            </div>
        )
    }

