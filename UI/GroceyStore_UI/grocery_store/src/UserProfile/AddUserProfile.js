import React, { useState, useStore } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'




export const AddUserProfile = (props) => {

    var user ={address:[{addressLine1:"", addressLine2:"", city:"", pinCode:""}],firstName:"", lastName:"", email:"", phoneNumber:""}
     const [check, setUser] = useState()
    // const [userStore, setUserStore] = useStore()
    

    const address =()=>{
        return(
            <div>
                <TextField
                            margin="normal"
                            required
                            id="addressLine1"
                            label="Address Line 1"
                            name="addressLine1"
                            onChange={(event)=>handleAddressChange(event.target.name, event.target.value, address.id)}
                        />
                        <br />
                        <TextField
                            margin="normal"
                            id="Address"
                            label="Address Line 2"
                            name="addressLine2"
                            onChange={(event)=>handleAddressChange(event.target.name, event.target.value, address.id)}

                        />
                        <br />
                        <TextField
                            margin="normal"
                            required
                            id="City"
                            label="City"
                            name="city"
                            onChange={(event)=>handleAddressChange(event.target.name, event.target.value, address.id)}

                        />
                        <br />
                        <TextField
                            margin="normal"
                            required
                            id="Pin"
                            label="Pin code"
                            name="pinCode"
                            type="number"
                            onChange={(event)=>handleAddressChange(event.target.name, event.target.value, address.id)}

                        />
            </div>
        )
    }

    const handleAddressChange=(event)=>{

        var {name, value} = event
        user.address[0].[name]=value
        
    }
    const handleFormChange=(event)=>{
        user.[event.target.name]=event.target.value
        //setUser()
    }

    const handleSubmit=(event)=>{

        console.log('am here')
        event.preventDefault()
        console.log(user)
        setUser(user)
    }

    return(
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