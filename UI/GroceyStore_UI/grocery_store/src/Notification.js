import React, { Component } from "react";
import Header from './Header'

class Notification extends Component{

    render(){
        return(
            <div>
                <Header title={(this.props.location.pathname).substring(1)}/>
                This is Notification page
            </div>
            )
    }

}

export default Notification;