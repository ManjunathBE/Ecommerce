import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'
import { Address } from './Address'


export const EditUserProfile = (props) => {
    var userDetails = props.location.state.user

    return (
        <React.Fragment>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />
            
            <Button type="submit"                    
                    variant="contained" 
                    color="primary">Update</Button>
            <form>
                <TextField
                    margin="normal"
                    required
                    id="FirstName"
                    label="FirstName"
                    name="FirstName"
                    autoFocus
                    defaultValue={userDetails.firstName}
                />
                <TextField
                    margin="normal"
                    required
                    id="LastName"
                    label="LastName"
                    name="LastName"
                    defaultValue={userDetails.lastName}
                />
                <TextField
                    margin="normal"
                    required
                    id="Email"
                    label="Email"
                    name="Email"
                    defaultValue={userDetails.email}
                />
                <TextField
                    margin="normal"
                    required
                    id="Phone"
                    label="Phone Number"
                    name="Phone"
                    defaultValue={userDetails.phoneNumber}
                />
                <Address userAddress={userDetails.address} />



            </form>
            
        </React.Fragment>
    )
}