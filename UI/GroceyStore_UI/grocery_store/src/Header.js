import React, { Component } from "react"

class Header extends Component {

    render() {
        return (
            <div id="header">
                <p className="headerTitle">
                    {this.props.title}
                </p>
            </div>
        )
    }
}

export default Header
