import React, { Fragment, useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Image from "./Images/login_pic.jpeg"
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { VerifyOtp } from './VerifyOtp'
import firebase from "@firebase/app";
import "@firebase/auth";
import { useAuth } from './Auth'
import { fetchUser } from './Helper'
import { useStore } from "./Store";
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(18, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        alignItems: 'center',
    },
    iconStyle: {
        border: "1px solid"
    },
    formPosition: {
        width: '65%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    btnStyling: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export const Login = (props) => {

    const classes = useStyles();
    const [showOtpInput, setShowOtpInput] = useState(false)
    const [phone, setPhone] = useState();
    const [errors, setErrors] = useState({})
    const { history } = props;
    const [firebaseConfirmationResult, setFirebaseConfirmationResult] = useState()
    const { setLoginState } = useAuth()
    const { userStore, setUserStore } = useStore();
    const { tokenStore, setTokenStore } = useStore();
    const {addresStore, setAddressStore} = useStore()

    const userHistory = useHistory()
    

    useEffect(() => {
        if (window.localStorage.token){
              const payload = {
                "mobilenumber": window.localStorage.phone,
                "logintype": "social",
                "device_token": ""
            }
            console.log(payload, 'payload')

             fetch('https://testapi.slrorganicfarms.com/auth/login',
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
                        }
                        else {
                            console.log(body, 'response')
                            var user = body.data[0]
                            var address = body.address
                            console.log('address from backend', address)
                            setLoginState(true)
                            window.localStorage.setItem('token', body.token)
                            window.localStorage.setItem('phone',user.Phone)
                            setUserStore({ user, type: 'User' })
                            setAddressStore({ address, type: 'Address' })
                            setTokenStore({ token: user.token })
                            console.log(history,'history object')
                            history.push('/')
                            
                        }
                    });
                }
            })
            .catch(error => {
                console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
            });   
        }
        
      }, [])

    const handlePhoneNumberChange = (event) => {
        setPhone(event.target.value)
    }
   
    const handleRequestOTP = (event) => {
        event.preventDefault()

        setShowOtpInput(true)



        // if (validatePhone()) {  
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('RequestOtpButton', {
        //     'size': 'invisible',
        //     'callback': (response) => {
        //       // reCAPTCHA solved, allow signInWithPhoneNumber.
        //     }
        // })
                     
        //         const appVerifier = window.recaptchaVerifier;
        //         firebase.auth().signInWithPhoneNumber('+91'+ phone, appVerifier)
        //             .then((confirmationResult) => {
        //                 // SMS sent. Prompt user to type the code from the message, then sign the
        //                 // user in with confirmationResult.confirm(code).
        //                 setShowOtpInput(true)
        //                 window.confirmationResult = confirmationResult;
        //                 setFirebaseConfirmationResult(confirmationResult)
        //             }).catch((error) => {
        //                console.log(error,'error in sending sms')
        //             });
        //     }
        //     console.log(errors, 'errors in handle otp')      
    }

    const validatePhone = () => {
        console.log(phone)
        var temp = []
        temp.phone = phone ? "" : "phone is required"
        if (!temp.phone) temp.phone = phone.length === 10 ? "" : "phone number should be 10 digits"
        setErrors({ ...temp })

        return Object.values(temp).every(param => param === "")
    }

    const editPhoneFromVerifyOtp = () => {
        setShowOtpInput(false)
        
    }

    return (
        <div>

            {/* <Header title='Organic House' history={props.history} /> */}
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5"> Sign in </Typography>

                        <form className={classes.formPosition}>
                            {!showOtpInput ?
                                <Fragment>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        required
                                        id="phone"
                                        label="Phone number (10 digits)"
                                        name="phone"
                                        onChange={handlePhoneNumberChange}
                                        error={errors.phone}
                                        helperText={errors.phone}
                                        defaultValue={phone}
                                    />


                                    <Button
                                        id='RequestOtpButton'
                                        className={classes.btnStyling}
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleRequestOTP}
                                    >
                                        Request OTP
          </Button> </Fragment> : <VerifyOtp editPhone={editPhoneFromVerifyOtp} firebaseConfirmationResult = {firebaseConfirmationResult} phone={phone} history={history} />}
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
