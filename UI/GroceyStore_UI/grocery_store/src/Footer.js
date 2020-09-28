import React, { Component } from "react"
import { Router, Link } from 'react-router-dom'

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="footer">
                <Link className="footerLink icon col-2" to="/User Profile"> User Profile</Link>
                <Link className="footerLink icon col-2" to="/History"> History</Link>
                <Link className="footerLink icon col-2" to="/Cart"> Cart</Link>
                <Link className="footerLink icon col-3" to="/Select View"> Select View</Link>
                <Link className="footerLink icon col-3" to="/Notification"> Notifaction</Link>
            </div>
        )
    }
}

export default Footer
