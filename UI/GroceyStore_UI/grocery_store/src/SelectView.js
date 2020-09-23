import React, { Component } from "react";
import {Header} from './Header'

export const SelectView =(props)=>{
    

        return (
            <div>
                <Header title={(props.location.pathname).substring(1)} history={props.history}/>
                This is SelectView page
            </div>
        )
    }


