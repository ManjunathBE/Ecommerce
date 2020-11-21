import React, { Component, useState } from "react";
import { Header } from './Header'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { useAuth } from './Auth'
import { useStore } from "./Store";

export const Login = (props) => {

    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [passwordFromUser, setPasswordFromUser] = useState();
    const [showOTPInputAndLogin, setShowOTPInputAndLogin] = useState(false)
    const [errors, setErrors] = useState({})
    const { setLoginState } = useAuth()
    const { history } = props;
    const { userStore, setUserStore } = useStore();

    const generateOtp = () => {
        var digits = '0123456789';
        var otpLength = 4;
        var otp = '';
        for (let i = 1; i <= otpLength; i++) {
            var index = Math.floor(Math.random() * (digits.length));
            otp = otp + digits[index];
        }
        setPassword(otp)
        return otp;
    }

    const handlePhoneNumberChange = (event) => {
        setPhone(event.target.value)
    }
    const handleRequestOTP = (event) => {
        event.preventDefault()
        if (validatePhone()) {
            console.log('amhere')
            var otp = generateOtp()
            console.log(otp, 'otp')
            setShowOTPInputAndLogin(true)
            var url = "https://api.msg91.com/api/v5/otp?authkey=346751ACJJ5GwM0os65fa953a2P1&template_id=5fa958027dd0a25d7340bf39&mobile=91" + phone + "&otp=" + otp
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
        console.log(errors,'errors in handle otp')

    }

    const handlePasswordChange = (event) => {
        setPasswordFromUser(event.target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        if (validateForm()) {
            console.log(password, 'password')
            setLoginState(true)
            fetchUser()
            history.push('/')
        }
        console.log(errors,'errors')
    }

    const validatePhone = () => {
        console.log(phone)
        var temp = []
        temp.phone = phone ? "" : "phone is required"
        if (!temp.phone) temp.phone = phone.length === 10 ? "" : "phone number should be 10 digits"
        setErrors({ ...temp })

        // temp.password = password?"":"otp is required"
        // if(password!==passwordFromUser)temp.password="otp doensn't match"
        // setErrors({...temp})

        return Object.values(temp).every(param => param === "")
    }

    const validateForm = () => {
        var temp = []
        temp.phone = phone ? "" : "phone is required"
        if (!temp.phone) temp.phone = phone.length === 10 ? "" : "phone number should be 10 digits"

        temp.password = password ? "" : "otp is required"
        if (password !== passwordFromUser) temp.password = "otp doensn't match"
        setErrors({ ...temp })

        return Object.values(temp).every(param => param === "")
    }

    const fetchUser = () => {

        fetch('https://localhost:44360/api/user?phoneNumber=91'+phone,
          {
            mode: 'cors'
          })
          .then(result => {
            console.log(result)
            if (result.status === 404) {
              console.log('result is 404')
            } else if (result.status !== 200) {
              console.log(result)
              console.log('result is not 200')
            } else {
              result.json().then(body => {
                console.log(body, 'response')
                console.log(body.address)
                var user=body
                setUserStore({user})

              });
            }
          })
          .catch(error => {
            console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
          });
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
                    onChange={handlePasswordChange}
                    error={errors.password}
                    helperText={errors.password}
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
