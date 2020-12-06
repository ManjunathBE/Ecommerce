import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'
import { useStore } from "../Store"




export const AddUserProfile = (props) => {
    const { history } = props

    let user = { address: [{ addressLine1: "", addressLine2: "", city: "", pinCode: "" }], firstName: "", lastName: "", email: "", phoneNumber: "" }
    const [userDetails, setUserDetails] = useState(user)
    const { userStore, setUserStore } = useStore()
    const [errors, setErrors] = useState({})


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
                    error={errors.addressLine1}
                    helperText={errors.addressLine1}
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
                    error={errors.city}
                    helperText={errors.city}

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
                    error={errors.pinCode}
                    helperText={errors.pinCode}

                />
                <br/>
                <br/>
                <br/>
                <br/>

            </div>
        )
    }

    const handleAddressChange = (event) => {
        var { name, value } = event.target
        userDetails.address.map((x) => x.[name] = value)

    }
    const handleFormChange = (event) => {
        console.log(userDetails, 'user state')
        console.log('inchange value', event.target.value)
        console.log('inchange event for ',event.target.name)
        var value = event.target.value
        if (event.target.name === 'phoneNumber') {
            value = Number(value)
        }
        userDetails.[event.target.name] = value
        //setUser()
    }

    const validate = (event)=>{
        const temp =[]
        temp.firstName = userDetails.firstName? "" : "First name is required"
        temp.email = userDetails.email ? "" :"Email is required"

        temp.phone = userDetails.phoneNumber ? "" : "Phone is required"
        if (!temp.phone) temp.phone = userDetails.phoneNumber.toString().length == 10 ? "" : "phone number should be 10 digits"

    userDetails.address.forEach(address => {
        temp.addressLine1 =  address.addressLine1? "" : "Address Line 1 is required"
           temp.city = address.city? "" : "City is required"      
           temp.pinCode = address.pinCode? "" : "pin code is required"
           if(!temp.pinCode) temp.pinCode = address.pinCode.length === 6 ?"":"Pincode should be 6 digits long"
            
    });

        setErrors({ ...temp })
        return Object.values(temp).every(param => param === "")
    }

    const handleSubmit = (event) => {
        console.log('in submit', userDetails)
        event.preventDefault()
        if(validate()){
        console.log(user,'user in submit')


        fetch('https://localhost:44360/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
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
    }

    return (
        <div>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />
            <form >
            <Button onClick={handleSubmit}>Update</Button>
                <TextField
                    margin="normal"
                    required
                    id="FirstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    onChange={handleFormChange}
                    error={errors.firstName}
                    helperText={errors.firstName}
                />
                <TextField
                    margin="normal"
                    required
                    id="Last Name"
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
                    type="email"
                    onChange={handleFormChange}
                    error={errors.email}
                    helperText={errors.email}
                />
                <TextField
                    margin="normal"
                    required
                    id="Phone (10 digits)"
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={handleFormChange}
                    error={errors.phone}
                    helperText={errors.phone}
                />
            </form>
            {address()}
            

        </div>
    )
}