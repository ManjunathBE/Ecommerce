import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'
import { useStore } from "../Store"


export const Address = (props) => {
    const [address, setAddress] = useState({ addressLine1: "", addressLine2: "", city: "", pinCode: "" })
    const [errors, setErrors] = useState({})
    const { userStore, setUserStore } = useStore()
    const {history} = props

    const handleAddressChange = (event) => {
        var { name, value } = event.target
        address.[name] = value

    }

    const handleSubmit = (event) => {
        console.log(address, 'addressss')
        validate()
        address.userId = userStore.user.userId
        console.log('userid', address.userId)
        fetch('https://localhost:44360/api/user/address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(address)
        })
        .then(result => {
            if (result.status === 201) {
                result.json().then(address => {
                    console.log(address, 'result from backend')
                    setUserStore({address, type:'Address'})
                })
                props.modelOpen("false")
            }
        })
        
    }

    const validate = (event) => {
        const temp = []

        temp.addressLine1 = address.addressLine1 ? "" : "Address Line 1 is required"
        temp.city = address.city ? "" : "City is required"
        temp.pinCode = address.pinCode ? "" : "pin code is required"
        if (!temp.pinCode) temp.pinCode = address.pinCode.length === 6 ? "" : "Pincode should be 6 digits long"


        setErrors({ ...temp })
        return Object.values(temp).every(param => param === "")
    }


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
            <Button onClick={handleSubmit}>Update</Button>
            <br />
            <br />
            <br />

        </div>
    )
}