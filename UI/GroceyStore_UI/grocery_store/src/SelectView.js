import React, { Component } from "react";
import Header from './Header'

class SelectView extends Component{
    render(){
       
        return(
            <div>
                <Header title={(this.props.location.pathname).substring(1)}/>
                This is SelectView page
            </div>
            )
    }

}

export default SelectView;