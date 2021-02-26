import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAuth } from './Auth'
import { useStore } from "./Store";
import { makeStyles } from "@material-ui/core/styles";
import { fetchUser } from './Helper'

const useStyles = makeStyles((theme) => ({

    btnStyling: {
        margin: theme.spacing(2, 0, 1),
    }
}));

export const VerifyOtp = (props) => {

    const classes = useStyles();
    const [passwordFromUser, setPasswordFromUser] = useState();
    const { history, phone, firebaseConfirmationResult } = props
    //const [password, setPassword] = useState(props.location.state.password);
    const [errors, setErrors] = useState({})
    const { setLoginState } = useAuth()
    const { userStore, setUserStore } = useStore();
    const { tokenStore, setTokenStore } = useStore();
    const { addresStore, setAddressStore } = useStore()

    //var phone = props.location.state.phone



    const handlePasswordChange = (event) => {
        setPasswordFromUser(event.target.value)
    }

    const validateForm = () => {
        var temp = []
        console.log(props)
        temp.password = passwordFromUser ? "" : "otp is required"
        setErrors({ ...temp })
        return Object.values(temp).every(param => param === "")
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        if (validateForm()) {
            setLoginState(true)

            const payload = {
                "mobilenumber": phone,
                "logintype": "social",
                "device_token": ""
            }

            await fetch('https://testapi.slrorganicfarms.com/auth/login',
                {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(result => {
                    console.log(result, 'fetch in login')
                    if (result.status === 404) {
                        console.log('result is 404')
                    } else if (result.status !== 200) {
                        console.log(result)
                        console.log('result is not 200')
                    } else {
                        result.json().then(body => {
                            if (body.success !== true) {
                                console.log('request failed', body)
                                history.push('/noauth')
                            }
                            else {
                                console.log(body, 'response')
                                var user = body.data[0]
                                var address = body.address
                                console.log('address from backend', address)
                                window.localStorage.setItem('token', body.token)
                                window.localStorage.setItem('phone', user.Phone)
                                window.localStorage.setItem('loginState',true)

                                setUserStore({ user, type: 'User' })
                                setAddressStore({ address, type: 'Address' })
                            setTokenStore({ token: body.token })

                            history.push({
                                pathname: "/",
                                state: { token: body.token }
                            })
                            }
                        });
                    }
                })
                .catch(error => {
                    console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
                });







            // 
            //     firebaseConfirmationResult.confirm(passwordFromUser).then((result) => {
            //         setLoginState(true)
            //         fetchUser()
            //         history.push('/')
            //     }).catch((error) => {
            //         console.log(error,'otp mismatch')
            //         alert('Otp doesnt match, try again')
            //     });
        }
        // console.log(errors, 'errors')
    }

    const fetchUser = async () => {




    }



    const handleEditPhone = () => {
        props.editPhone()
    }

    return (
        <div>
            <div>
                <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    id="phone"
                    label="Phone"
                    name="phone"
                    defaultValue={phone}
                    disabled

                />

                <TextField
                    variant="outlined"
                    fullWidth
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
                    className={classes.btnStyling}
                    // type="submit"
                    fullWidth
                    variant="contained"
                    // color="primary"
                    onClick={handleEditPhone}
                >
                    Edit Phone Number
          </Button>

                <Button
                    className={classes.btnStyling}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
          </Button>
            </div>
        </div>
    )
}