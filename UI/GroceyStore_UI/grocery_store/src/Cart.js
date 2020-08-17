import React, {Component} from "react"
import Header from './Header'


class Cart extends Component{

    render(){
        return(
            <div>
                <Header title={(this.props.location.pathname).substring(1)}/>
               You are in cart page
            </div>
        )
    }
}

export default Cart