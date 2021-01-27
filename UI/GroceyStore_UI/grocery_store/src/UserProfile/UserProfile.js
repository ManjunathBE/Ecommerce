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
  Grid, Hidden, Avatar,
  Card, CardMedia, CardContent,
} from "@material-ui/core";
import { Address } from './Address'
import { MenuPane } from '../MenuPane'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { blue } from '@material-ui/core/colors';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { shadows } from '@material-ui/system';
import { toFirstCharUppercase } from "../Healper";
import NoProfilePic from '../Images/no-profile-picture.jpg'
import {Spinner} from '../Spinner'
import Footer from '../Footer'

const useStyles = makeStyles((theme) => ({


  avatarDiv: {
    [theme.breakpoints.down('xs')]: {
      backgroundColor: blue[100],
      width: '100vw',
      height: theme.spacing(14),
    },
    height: theme.spacing(18),

  },
  userDetailsDiv: {
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
    },
    marginTop: theme.spacing(3)

  },
  AddressDiv:{
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
     padding: theme.spacing(3),
  },
  formPosition: {
    paddingBottom: theme.spacing(4),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(9),
    },
  },
  root: {
    display: 'flex',
    width: '100%'
  },
  btnStyling: {
    width: "60%",
    padding: "2%",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    width: theme.spacing(13),
    height: theme.spacing(13),
    margin: 'auto',
    position: "relative",
    top: "60%",
    transform: "translateY(-50%)",
    [theme.breakpoints.down('xs')]: {
      top: "80%",
    }
  }


}));

export const UserProfile = (props) => {
  const classes = useStyles();
  console.log(props, 'user profile props')
  useEffect(() => {
    if (!history.location.state){
      setShowSpinner(false)
    }
    fetchUserDetails()
  }, [])
  const [user, setUser] = useState({})
  const [isFetched, setIsFetched] = useState(false)
  const { history } = props;
  const { userStore, setUserStore } = useStore();
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)
  const [showSpinner, setShowSpinner] = useState(true)

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
          setShowSpinner(false)
        } else if (result.status !== 200) {
          console.log(result)
          console.log('result is not 200')
          setShowSpinner(false)
        } else {
          result.json().then(body => {
            console.log(body, 'response')
            console.log(body.address)
            var user = body
            setUserStore({ user, type: 'User' })
            setShowSpinner(false)

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
      <div className={classes.root}>

        <Hidden smDown>
          <MenuPane history={history} />
        </Hidden>

        {Object.keys(userStore.user).length !== 0 ? (
          <div className={classes.formPosition}>
            <Card>
              <Grid container>
                <Grid item xs={12} md={4} lg={4}>
                  <div className={classes.avatarDiv}>
                    <Avatar className={classes.blue}
                    src={NoProfilePic}/>
                      {/* <PersonOutlineOutlinedIcon style={{ fontSize: '400%' }} /> */}
                    {/* </Avatar> */}
                  </div>

                </Grid>
                <Grid className={classes.userDetailsDiv} item xs={12} md={8} lg={8}>
                  <Typography variant="h5"> {userStore.user.FirstName} {userStore.user.LastName}</Typography>
                  <Typography variant="h6"><PhoneIphoneOutlinedIcon style={{ color: "blue" }} />   {userStore.user.Phone}</Typography>
                  <Typography variant="h6"><EmailOutlinedIcon style={{ color: "blue" }} />   {userStore.user.Email}</Typography>
                </Grid>
              </Grid>
              {/* {isFetched? user.address.map((item)=><p>{item.AddressLine1}</p>):""} */}
              
              <Grid container>
               
               
                {(userStore.user.address).map((id, index) =>

                  <Grid className={classes.AddressDiv} item xs={12} md={4} >
                    <Card className={classes.AddressDiv} >
                      {/* <Typography> Address : {index+1} <br/> {id.addressLine1}, {id.addressLine2}<br />{`${toFirstCharUppercase(id.city)}`}<br /> Pin: {id.pinCode}</Typography> */}
                      <Typography> Address : {id.AddressNickName}<br/>{id.StreetDetails}<br /> Pin: {id.pincode} </Typography>
                    </Card>
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
            </Card>
            <Dialog open={showAddAddressDialog} onClose={handleDialogClose}>
              <DialogTitle>

              </DialogTitle>
              <DialogContent>
                <Address modelOpen={closeModal} />
              </DialogContent>


            </Dialog></div>)
          : <Redirect to="/AddUserProfile" />}

<Hidden mdUp >
              <Footer history={history}/>
            </Hidden>
           <Spinner showSpinner={showSpinner}/>
      </div>
    </div>

  )
}

