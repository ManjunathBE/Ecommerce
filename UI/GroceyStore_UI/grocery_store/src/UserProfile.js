import React, { Component } from "react"
import Header from './Header'


class UserProfile extends Component {

    render() {


        return (
            <div>
                <Header title={(this.props.location.pathname).substring(1)} />
               You are in User Profile page
            </div>
        )
    }
}

export default UserProfile
