import React, { Component } from "react"
import { Router, Link } from 'react-router-dom'


export const Footer=(props)=>{
    const {history} = props

    const getContent=()=>{
        
        if(window.location.pathname==='/login') return null
        else{
            return ( <div id="footer">
            <Link className="footerLink icon col-2" to="/UserProfile"> User Profile</Link>
            <Link className="footerLink icon col-2" to="/History"> History</Link>
            <Link className="footerLink icon col-2" to="/Cart"> Cart</Link>
            <Link className="footerLink icon col-3" to="/Select View"> Select View</Link>
            <Link className="footerLink icon col-3" to="/Notification"> Notifaction</Link>
        </div>)
        }
    }
        
return getContent()
    }


export default Footer
