import React, { Component, useState } from "react";
import { Header } from './Header'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import {useAuth} from './Auth'

export const Login = (props) => {

    const [phone, setPhone] = useState();
    const [showOTPInputAndLogin, setShowOTPInputAndLogin] = useState(false)
    const [errors, setErrors] = useState({})
    const {setLoginState} = useAuth()

    const generateOtp = () => {
        var digits = '0123456789';
        var otpLength = 4;
        var otp = '';
        for (let i = 1; i <= otpLength; i++) {
            var index = Math.floor(Math.random() * (digits.length));
            otp = otp + digits[index];
        }
        return otp;
    }

    const handlePhoneNumberChange = (event) => {
        setPhone(event.target.value)
    }
    const handleRequestOTP = (event) => {
        event.preventDefault()
        if(validate()){
        var otp = generateOtp()
        setShowOTPInputAndLogin(true)
        console.log('am here')
        var url = "https://api.msg91.com/api/v5/otp?authkey=346751ACJJ5GwM0os65fa953a2P1&template_id=5fa958027dd0a25d7340bf39&mobile=91" + phone + "&invisible=1&otp=" + otp
        fetch(url, {
            mode: 'no-cors',
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        }).then(response => {
            console.log('otp response', response)
        })
            .catch(error => {
                console.log('otp error', error)
            })
        }

    }

    const handleLogin= ()=>{

        setLoginState(true)
    }

    const validate=()=>{
        var temp =[]
        temp.phone = phone?"":"phone is required"
        if(!temp.phone)temp.phone = phone.length===10?"":"phone number should be 10 digits"
        setErrors({...temp})

        return Object.values(temp).every(param => param=="")
    }

    return (
        <div>
            <Header title='Organic House' history={props.history} />

            <form>
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="phone"
                label="Phone number (10 digits)"
                name="phone"
                autoFocus
                onChange={handlePhoneNumberChange}
                error={errors.phone}
                helperText={errors.phone}
                
            />

            {showOTPInputAndLogin ? <React.Fragment><TextField
                variant="outlined"
                margin="normal"
                required
                id="password"
                label="please enter otp"
                name="password"
                type="password"
            />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}

                >
                    Login
          </Button></React.Fragment> : 

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRequestOTP}
            >
                Request OTP
          </Button>}

          </form>






        </div>
    )
}
