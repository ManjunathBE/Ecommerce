import React, { useState, useEffect } from "react"
import { Header } from '../Header'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useStore } from "../Store";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@material-ui/core";
import { Address } from './Address'

const useStyles = makeStyles((theme) => ({
  formPosition: {
    textAlign: "center",
    marginTop: "40%",

  },

  btnStyling: {
    width: "60%",
    padding: "2%",
    textAlign: "center",
  }


}));

export const UserProfile = (props) => {
  const classes = useStyles();
  console.log(props, 'user profile props')
  useEffect(() => {
    fetchUserDetails()
  }, [])
  const [user, setUser] = useState({})
  const [isFetched, setIsFetched] = useState(false)
  const { history } = props;
  const { userStore, setUserStore } = useStore();
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)

  const fetchUserDetails = () => {

    if (history.location.state)
      console.log('inside if')
    fetch('https://localhost:44360/api/user?phonenumber=' + userStore.user.phoneNumber,
      {
        mode: 'cors'
      })
      .then(result => {
        console.log(result, 'profile')
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
  console.log(userStore.user === null, 'user obj length')
  console.log(userStore.user, 'user obj')
  console.log(userStore, 'user store')
  console.log(userStore.user.length, 'user obj length')

  const handleAddAddress = () => {

    setShowAddAddressDialog(true)
  }

  const handleDialogClose = () => {
    setShowAddAddressDialog(false)
  }

  const closeModal = () => {
    setShowAddAddressDialog(false)
  }

  return (

    <div >
      <Header title={(props.location.pathname).substring(1)} history={props.history} />
      {Object.keys(userStore.user).length !== 0 ? (<div className={classes.formPosition}>
        <Typography>Name : {userStore.user.firstName} {userStore.user.lastName}</Typography>
        <Typography>Mobile : {userStore.user.phoneNumber}</Typography>
        <Typography>Email :  {userStore.user.email}</Typography>

        {/* {isFetched? user.address.map((item)=><p>{item.AddressLine1}</p>):""} */}
        <Grid container>
        { (userStore.user.address).map((id) =>
        
          <Grid item xs={6}>
            <Typography>Address : {id.addressLine1} <br />{id.addressLine2}<br />{id.city}<br />{id.pinCode}</Typography>
          </Grid>
        )}
        </Grid>

        <Button color="primary" variant="contained"
          onClick={() => history.push({
            pathname: '/Edit User Profile',
            state: { user: userStore.user }
          })}>
          Edit Profile
</Button>
        <Button onClick={handleAddAddress}>Add Address</Button>
        <Dialog open={showAddAddressDialog} onClose={handleDialogClose}>
          <DialogTitle>

          </DialogTitle>
          <DialogContent>
            <Address modelOpen={closeModal} />
          </DialogContent>


        </Dialog></div>)
        : <Redirect to="/AddUserProfile" />}
    </div>

  )
}

