import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export const Address = (props) => {
    var userAddress = props.userAddress
    console.log(userAddress,'in edit')

    return (userAddress.map((address)=>
        <div>
            <p>Address {address.id}</p>
            <TextField
                margin="normal"
                required
                id="Address"
                label="Address Line 1"
                name="Address1"
                defaultValue = {address.addressLine1}
            />
<br/>
            <TextField
                margin="normal"
                id="Address"
                label="Address Line 2"
                name="Address2"
                defaultValue = {address.addressLine2}

            />
            <br/>
            <TextField
                margin="normal"
                required
                id="City"
                label="City"
                name="City"
                defaultValue = {address.city}

            />
            <br/>
            <TextField
                margin="normal"
                required
                id="Pin"
                label="Pin code"
                name="pinnCode"
                type="number"
                defaultValue = {address.pinCode}

            />

        </div>)
    )
}

