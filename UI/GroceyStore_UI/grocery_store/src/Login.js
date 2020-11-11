import React, { Component } from "react";
import { Header } from './Header'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const Login = (props) => {

    const handleRequestOTP = ()=>{
        var url = "https://api.msg91.com/api/v5/otp?authkey=346751ACJJ5GwM0os65fa953a2P1&template_id=5fa958027dd0a25d7340bf39&mobile=919677513661&invisible=1&otp=1234"      
        fetch(url,{
            
            headers: {
                "content-type": "application/json"
              }
        }).then(response=>{
            console.log('otp response', response)
        })
        .catch(error=>{
            console.log('otp error', error)
        })

    }
    
    return (
        <div>
            <Header title='Organic House' />
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="phone"
                label="Phone number (10 digits)"
                name="phone"
                autoComplete="phone"
                autoFocus
            />

            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary" 
                onClick={handleRequestOTP}       
            >
                Request OTP
          </Button>


        </div>
    )
}
