import React, { Component, useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export const EditUserDetails =(props)=>{


  console.log(props,'props in edit')
    const [updatedUserData, setUpdatedUserData ] = useState({
        uuserId: props.userId,
        FirstName:props.firstName,
        LastName:props.lastName,
        Email:props.email,
        Phone:props.phoneNumber,
        pic:"",
        branchid:props.branchId
    })


    const handleFormChange=(event)=>{
        const { name } = event.target

        var value = event.target.value
        if(name === 'phoneNumber'){
            value = Number(value)
        }

        setUpdatedUserData({
            ...updatedUserData,
            [name]: value
        })
    }

    const handleUpdateClick=()=>{
        console.log(updatedUserData,'updated user data')


        fetch('https://testapi.slrorganicfarms.com/profile/UpdateProfileClient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': window.localStorage.token
            },
            body: JSON.stringify(updatedUserData)
          })
          .then(result => {
            console.log(result)
            if (result.status === 404) {
              console.log('result is 404')
             
            } else if (result.status !== 200) {
              console.log('result is not 200')
             
            } else {
              result.json().then(body => {
                if (body.success !== true) {
                  console.log('request failed', body)
                  
                } else {
                  console.log(body, 'response')
                  props.ProfileUpdated()
                }
              });
            }
          })
          .catch(error => {
            console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
          });
    }

    return (
        <form >
        <TextField
            margin="normal"
            required
            id="FirstName"
            label="FirstName"
            name="FirstName"
            autoFocus
            defaultValue={props.firstName}
            onChange={handleFormChange}
        />
        <TextField
            margin="normal"
            required
            id="LastName"
            label="LastName"
            name="LastName"
            defaultValue={props.lastName}
            onChange={handleFormChange}
        />
        <TextField
            margin="normal"
            required
            id="Email"
            label="Email"
            name="Email"
            defaultValue={props.email}
            onChange={handleFormChange}
        />
        <TextField
            margin="normal"
            required
            id="Phone"
            label="Phone Number"
            name="Phone"
            defaultValue={props.phoneNumber}
            onChange={handleFormChange}
            disabled
        />
        <Button onClick={handleUpdateClick}>Update</Button>
        </form>
    )
}