import React, { Component, Fragment, useState } from "react";
import { Header } from './Header'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { useAuth } from './Auth'
import { useStore } from "./Store";
import { makeStyles } from "@material-ui/core/styles";
import { VerticalAlignCenter } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Image from "./Images/login_pic.jpeg"
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { VerifyOtp } from './VerifyOtp'

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
        margin: theme.spacing(20, 4),
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
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({})
    const { history } = props;


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
                // history.push({
                //     pathname: '/verifyotp',
                //     state: { phone: phone, password: otp }
                // })
                setShowOtpInput(true)

            })
                .catch(error => {
                    console.log('otp error', error)
                })
        }
        console.log(errors, 'errors in handle otp')
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
                                    />

                                    <Button
                                        className={classes.btnStyling}
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleRequestOTP}
                                    >
                                        Request OTP
          </Button> </Fragment> : <VerifyOtp editPhone={editPhoneFromVerifyOtp} password={password} phone={phone} history={history} />}

                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
