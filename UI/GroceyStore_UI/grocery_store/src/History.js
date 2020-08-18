import React, { Component } from "react";
import Header from './Header'

class History extends Component{

    render(){
        return(
            <div>
                <Header title={(this.props.location.pathname).substring(1)}/>
                This is History page
            </div>
            )
    }

}

export default History;