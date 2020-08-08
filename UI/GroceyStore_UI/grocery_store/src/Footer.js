import React, {Component} from "react"
import {Router, Link} from 'react-router-dom'

class Footer extends Component{
    constructor(props) {
        super(props);
        console.log(this.props)
    }    

    render(){
        return(
            <div id="footer">
                <Link className="footerLink" to="/userprofile"> User Profile</Link>
                <Link className="footerLink" to="/cart"> Cart</Link>
                <Link className="footerLink" to="/history"> History</Link>
                <Link className="footerLink" to="/Notification"> Notifaction</Link>
            </div>
        )
    }
}

export default Footer