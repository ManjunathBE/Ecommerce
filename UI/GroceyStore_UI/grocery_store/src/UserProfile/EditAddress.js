import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'
import { useStore } from "../Store"


export const EditAddress = (props) => {
    const [address, setAddress] = useState({ FirstAddress: props.addressLine1, 
                                             StreetDetails: props.addressLine2, 
                                             City: props.city, Phone:props.phone, pincode: props.pinCode,
                                             NickName:props.addressName
                                         })
    const [errors, setErrors] = useState({})
    const { userStore, setUserStore } = useStore()
    const { history } = props

    const handleAddressChange = (event) => {
        var { name, value } = event.target
        address.[name] = value

    }

    const handleSubmit = (event) => {
        console.log(props)
        console.log(address, 'addressss')
        validate()
        address.userId = userStore.user.userId
        console.log('userid', address.userId)
        fetch('https://testapi.slrorganicfarms.com/profile/AddUpdateAdddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.localStorage.token
            },
            body: JSON.stringify(address)
        })
            .then(result => {
                if (result.status === 200) {
                    result.json().then(body => {
                        if (body.success !== true) {
                            console.log('request failed', address)
                        }else{      
                        
                        props.AddressUpdated()
                        }
                    })
                  
                }
            })

    }

    const validate = (event) => {
        const temp = []
        console.log(address)

        temp.addressLine1 = address.FirstAddress ? "" : "Address Line 1 is required"
        temp.city = address.City ? "" : "City is required"
        console.log(address.pincode.length,'pin length')

        console.log(address.pincode)
        console.log(typeof(address.pincode))
        temp.pinCode = (address.pincode) ? "" : "pin code is required"

        if (!temp.pinCode) temp.pinCode = (address.pincode).toString().length === 6 ? "" : "Pincode should be 6 digits long"
       


        setErrors({ ...temp })
        return Object.values(temp).every(param => param === "")
    }


    return (
        <div>
            <TextField
                margin="normal"
                required
                id="addressName"
                label="Address Name"
                name="NickName"
                onChange={handleAddressChange}
                defaultValue={props.addressName}
            />
            <TextField
                margin="normal"
                required
                id="addressLine1"
                label="Address Line 1"
                name="FirstAddress"
                onChange={handleAddressChange}
                error={errors.addressLine1}
                helperText={errors.addressLine1}
                defaultValue={props.addressLine1}
            />
            <br />
            <TextField
                margin="normal"
                id="Address"
                label="Address Line 2"
                name="StreetDetails"
                onChange={handleAddressChange}
                defaultValue={props.addressLine2}

            />
            <br />
            <TextField
                margin="normal"
                required
                id="City"
                label="City"
                name="City"
                onChange={handleAddressChange}
                error={errors.city}
                helperText={errors.city}
                defaultValue={props.city}

            />
            <br />
            <TextField
                margin="normal"
                required
                id="Pin"
                label="Pin code"
                name="pincode"
                type="number"
                onChange={handleAddressChange}
                error={errors.pinCode}
                helperText={errors.pinCode}
                defaultValue={props.pinCode}
            />
            <TextField
                margin="normal"
                required
                id="Phone"
                label="Phone (10 digits)"
                name="Phone"
                type="number"
                onChange={handleAddressChange}        
                defaultValue={props.phone}
            />
            <Button onClick={handleSubmit}>Update</Button>
            <br />
            <br />
            <br />

        </div>
    )
}