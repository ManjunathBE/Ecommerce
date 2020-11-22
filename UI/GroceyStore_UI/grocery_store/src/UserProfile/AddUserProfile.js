import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'
import { useStore } from "../Store"




export const AddUserProfile = (props) => {
    const { history } = props

    var user = { address: [{ addressLine1: "", addressLine2: "", city: "", pinCode: "" }], firstName: "", lastName: "", email: "", phoneNumber: "" }
    const { userStore, setUserStore } = useStore()


    const address = () => {
        return (
            <div>
                <TextField
                    margin="normal"
                    required
                    id="addressLine1"
                    label="Address Line 1"
                    name="addressLine1"
                    onChange={handleAddressChange}
                />
                <br />
                <TextField
                    margin="normal"
                    id="Address"
                    label="Address Line 2"
                    name="addressLine2"
                    onChange={handleAddressChange}

                />
                <br />
                <TextField
                    margin="normal"
                    required
                    id="City"
                    label="City"
                    name="city"
                    onChange={handleAddressChange}

                />
                <br />
                <TextField
                    margin="normal"
                    required
                    id="Pin"
                    label="Pin code"
                    name="pinCode"
                    type="number"
                    onChange={handleAddressChange}

                />
            </div>
        )
    }

    const handleAddressChange = (event) => {
        var { name, value } = event.target
        user.address.map((x) => x.[name] = value)

    }
    const handleFormChange = (event) => {
        var value = event.target.value
        if (event.target.name === 'phoneNumber') {
            value = Number(value)
        }
        user.[event.target.name] = value
        //setUser()
    }

    const handleSubmit = (event) => {

        event.preventDefault()
        console.log(user)


        fetch('https://localhost:44360/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(result => {
                if (result.status === 201) {
                    result.json().then(user => {
                        console.log(user, 'result from backend')
                        setUserStore({user})
                    })
                    history.push('/')
                }
            })
    }

    return (
        <div>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />
            <form >
                <TextField
                    margin="normal"
                    required
                    id="FirstName"
                    label="FirstName"
                    name="firstName"
                    autoFocus
                    onChange={handleFormChange}
                />
                <TextField
                    margin="normal"
                    required
                    id="LastName"
                    label="LastName"
                    name="lastName"
                    onChange={handleFormChange}
                />
                <TextField
                    margin="normal"
                    required
                    id="Email"
                    label="Email"
                    name="email"
                    onChange={handleFormChange}
                />
                <TextField
                    margin="normal"
                    required
                    id="Phone"
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={handleFormChange}
                />
            </form>
            {address()}
            <Button onClick={handleSubmit}>Update</Button>

        </div>
    )
}