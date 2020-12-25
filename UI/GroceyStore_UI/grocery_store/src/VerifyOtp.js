import React, { Component, useState } from "react";
import { Header } from './Header'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { useAuth } from './Auth'
import { useStore } from "./Store";
import { makeStyles } from "@material-ui/core/styles";
import { VerticalAlignCenter } from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({

    // paper: {
    //     marginTop: theme.spacing(28),
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    // },

    // btnStyling: {
    //     width: "55%",
    //     padding: "2%",
    //     textAlign: "center",
    // }
}));

export const VerifyOtp = (props) => {
    
    const classes = useStyles();
    const [passwordFromUser, setPasswordFromUser] = useState();
    const { history, password, phone } = props
    //const [password, setPassword] = useState(props.location.state.password);
    const [errors, setErrors] = useState({})
    const { setLoginState } = useAuth()
    const { userStore, setUserStore } = useStore();
    //var phone = props.location.state.phone



    const handlePasswordChange = (event) => {
        setPasswordFromUser(event.target.value)
    }

    const validateForm = () => {
        var temp = []
        console.log(password, passwordFromUser)
        console.log(props)

        temp.password = password ? "" : "otp is required"
        if (password !== passwordFromUser) temp.password = "otp doensn't match"
        setErrors({ ...temp })

        return Object.values(temp).every(param => param === "")
    }

    const handleLogin = (event) => {
        event.preventDefault()
        if (validateForm()) {
            console.log(password, 'password')
            setLoginState(true)
            fetchUser()
            history.push('/')
        }
        console.log(errors, 'errors')
    }

    const fetchUser = () => {

        fetch('https://localhost:44360/api/user?phoneNumber=' + phone,
            {
                mode: 'cors'
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
                        console.log(body, 'response')
                        console.log(body.address)
                        var user = body
                        setUserStore({ user, type: 'User' })
                    });
                }
            })
            .catch(error => {
                console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
            });
    }

    const handleEditPhone =()=>{
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