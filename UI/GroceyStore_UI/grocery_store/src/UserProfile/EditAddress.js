import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../Header'
import { useStore } from "../Store"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    divider:{
        width:'25px'
    }

}));

export const EditAddress = (props) => {
    const [address, setAddress] = useState({ FirstAddress: props.addressLine1, 
                                             StreetDetails: props.addressLine2, 
                                             City: props.city, Phone:props.phone, pincode: props.pinCode,
                                             NickName:props.addressName,
                                             AddressId:props.addressId,
                                             GST:props.gst
                                         })
    const [errors, setErrors] = useState({})
    const { userStore, setUserStore } = useStore()
    const { history } = props
    const classes= useStyles();

    const handleAddressChange = (event) => {
        var { name, value } = event.target
        address.[name] = value

    }

    const handleSubmit = (event) => {
        console.log(props)
        console.log(address, 'addressss')
        if(validate()){

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

    }

    const validate = (event) => {
        const temp = []
        console.log(address,'in validate')
      
        temp.addressName = address.NickName?"":"Shop name is required"
        temp.addressLine1 = address.FirstAddress ? "" : "Address Line 1 is required"
        temp.addressLine2 = address.StreetDetails?"": "Address Line 2 is required"
        temp.city = address.City ? "" : "City is required"
        temp.pinCode = (/^[1-9][0-9]{5}$/).test(address.pincode)?"":"invalid pin"
        // /^$|([6-9][0-9]{9})/
        temp.Phone = (/^[6-9][0-9]{9}$/).test(address.Phone)?"":"invalid phone number"
        temp.gst = (/^$|(^.{15}$)/).test(address.GST)?"":"invalid GST number"
        // temp.pinCode = (address.pincode) ? "" : "pin code is required"

        // if (!temp.pinCode) temp.pinCode = (address.pincode).toString().length === 6 ? "" : "Pincode should be 6 digits long"
       
        setErrors({ ...temp })
        return Object.values(temp).every(param => param === "")
    }


    return (
        <div>
            <TextField
                margin="normal"
                required
                id="addressName"
                label="Shop and (branch/area)"
                name="NickName"
                onChange={handleAddressChange}
                defaultValue={props.addressName}             
                error={errors.addressName}
                helperText={errors.addressName}
            />
            
            <span className={classes.divider}></span>
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
                label="Pin code (6 digits)"
                name="pincode"
                onChange={handleAddressChange}
                error={errors.pinCode}
                helperText={errors.pinCode}
                defaultValue={props.pinCode}
            />
            <br/>
            <TextField
                margin="normal"
                required
                id="gst"
                label="GSTIN (15 digits)"
                name="GST"
                onChange={handleAddressChange}
                defaultValue={props.gst}
                error={errors.gst}
                helperText={errors.gst}
            />
            <br/>
            <TextField
                margin="normal"
                id="contactPerson"
                label="Contact Person"
                name="ContactPerson"
                onChange={handleAddressChange}
                defaultValue={props.contactPerson}
            />
            <br/>
            <TextField
                margin="normal"
                required
                id="Phone"
                label="Phone (10 digits)"
                name="Phone"
                onChange={handleAddressChange}        
                defaultValue={props.phone}
                error={errors.Phone}
                helperText={errors.Phone}
            />
           
            <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
            <br />
            <br />
            <br />

        </div>
    )
}