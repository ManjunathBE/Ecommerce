import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'


export const EditUserProfile = (props) => {
    var userDetails = props.location.state.user
    const [updatedUserData, setUpdatedUserData] = useState(userDetails)
    console.log(updatedUserData, 'updated')
    const {history} = props;

    const handleFormChange = (event) => {
        console.log(event, 'in change')
        const { name, value } = event.target
        setUpdatedUserData({
            ...updatedUserData,
            [name]: value
        })

    }

    const handleAddressChange = (name, value, id) => {

        console.log(name, value, id,'here we ')

        updatedUserData.address.map((address) => console.log(address.id))

        setUpdatedUserData({
            ...updatedUserData, address: updatedUserData.address.map((address) => address.id == (id) ?
                { ...address, [name]: value } : address)
        })

    }

    const handleSubmit = () => {
        var userId = userDetails.userId
        console.log(userId, 'userid')
        fetch('https://localhost:44360/api/User?userid=' + userId,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            })
            .then(result =>{

                if(result.status ===201){
                    history.push({
                        pathname:'/userprofile',
                        state:{isUserUpdated:true}
                    })
                }
            })
            }



    return (
        <React.Fragment>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />

            <Button type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}>Update</Button>

            <form >
                <TextField
                    margin="normal"
                    required
                    id="FirstName"
                    label="FirstName"
                    name="firstName"
                    autoFocus
                    defaultValue={userDetails.firstName}
                    onChange={handleFormChange}
                />
                <TextField
                    margin="normal"
                    required
                    id="LastName"
                    label="LastName"
                    name="lastName"
                    defaultValue={userDetails.lastName}
                    onChange={handleFormChange}
                />
                <TextField
                    margin="normal"
                    required
                    id="Email"
                    label="Email"
                    name="email"
                    defaultValue={userDetails.email}
                    onChange={handleFormChange}
                />
                <TextField
                    margin="normal"
                    required
                    id="Phone"
                    label="Phone Number"
                    name="phoneNumber"
                    defaultValue={userDetails.phoneNumber}
                    onChange={handleFormChange}
                />
                {(userDetails.address.map((address) =>
                    <div>
                        <p>Address {address.id}</p>
                        <TextField
                            margin="normal"
                            required
                            id={address.id}
                            label="Address Line 1"
                            name="addressLine1"
                            defaultValue={address.addressLine1}
                            onChange={(event)=>handleAddressChange(event.target.name, event.target.value, address.id)}
                        />
                        <br />
                        <TextField
                            margin="normal"
                            id="Address"
                            label="Address Line 2"
                            name="addressLine2"
                            defaultValue={address.addressLine2}
                            onChange={(event)=>handleAddressChange(event.target.name, event.target.value, address.id)}

                        />
                        <br />
                        <TextField
                            margin="normal"
                            required
                            id="City"
                            label="City"
                            name="city"
                            defaultValue={address.city}
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
                            defaultValue={address.pinCode}
                            onChange={(event)=>handleAddressChange(event.target.name, event.target.value, address.id)}

                        />

                    </div>)
                )}
            </form>
        </React.Fragment>
    )
}