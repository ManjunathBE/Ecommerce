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
import { EditAddress } from './EditAddress'
import { MenuPane } from '../MenuPane'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { blue } from '@material-ui/core/colors';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { shadows } from '@material-ui/system';
import { toFirstCharUppercase } from "../Helper";
import NoProfilePic from '../Images/no-profile-picture.jpg'
import {Spinner} from '../Spinner'
import Footer from '../Footer'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import {EditUserDetails} from './EditUserDetails'
import FlashMessage from 'react-flash-message'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


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
   // fetchUserDetails()
  }, [])

  const [user, setUser] = useState({})
  const [isFetched, setIsFetched] = useState(false)
  const { history } = props;
  const { userStore, setUserStore } = useStore();
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)
  const [showSpinner, setShowSpinner] = useState(true)
  const [showUserDetailsEditDialog, setShowUserDetailsEditDialog] = useState(false)
  const [showAddressEditDialog, setShowAddressEditDialog] = useState(false)
  const [showUserDetailsFlash, setShowUserDetailsFlash] = useState(false)
  const [showAddressFlash, setShowAddressFlash] = useState(false)
  const [AddressToEdit,setAddressToEdit] = useState({ FirstAddress: "", StreetDetails: "", City: "", Phone:"", pincode: "" })
  const { tokenStore, setTokenStore } = useStore();
  const {addressStore, setAddressStore} = useStore()

   const fetchUserDetails = (UpdateType) => {
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
                  
                  window.localStorage.setItem('token', body.token)
                  window.localStorage.setItem('phone',user.Phone)

                   setAddressStore({ address, type: 'Address' })
                   setUserStore({ user, type: 'User' })
                
                  setTokenStore({ token: user.token })
              }
          });
      }
  })
  .catch(error => {
      console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
  });  
   }

  console.log(userStore.user === null, 'user obj length equals')
  console.log(userStore.user, 'user obj')
  console.log(userStore, 'user store')
  console.log(userStore.user.length, 'user obj length')
  

  const handleAddAddress = () => {

    setShowAddAddressDialog(true)
  }

  const handleAddAddressDialogClose = () => {
    setShowAddAddressDialog(false)
  }

  const closeModal = () => {
    setShowAddAddressDialog(false)
  }

  const handleUserDetailsEdit =()=>{
   setShowUserDetailsEditDialog(true)
  }

  const handleAddressEdit=(Address)=>{
    console.log(Address, 'address to edit')
    setAddressToEdit(Address)
    setShowAddressEditDialog(true)
  }

  const handleEditUserDialogClose=()=>{
    setShowUserDetailsEditDialog(false)
  }

  const handleEditAddressDialogClose=()=>{
    setShowAddressEditDialog(false)
  }
  
  const handleUserDetailsUpdated=()=>{
    fetchUserDetails('User')
    setShowUserDetailsFlash(true)
    setShowUserDetailsEditDialog(false)
  }
  const handleAddressUpdated=()=>{
    fetchUserDetails('Address')
    setShowAddressEditDialog(false)
    setShowAddressFlash(true)
   
  }

  return (

    <div >
      <Header title={(props.location.pathname).substring(1)} history={props.history} />
      {showUserDetailsFlash ?
                <div >
                  <FlashMessage duration={5000} >
                    <div className='flashStyling text-center'>
                      Profile Updated
                        </div>
                  </FlashMessage>
                </div>: ""}

                {showAddressFlash ?
                <div >
                  <FlashMessage duration={5000} >
                    <div className='flashStyling text-center'>
                      Address Updated
                        </div>
                  </FlashMessage>
                </div>: ""}
      <div className={classes.root}>

        <Hidden smDown>
          <MenuPane history={history} />
        </Hidden>

        {(Object.keys(userStore.user).length !== 0) ? (
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
                  {/* FIX THE STORE STRUCTURE FOR USERSTORE.USER.USER */}
                  <Typography variant="h5"> {userStore.user.FirstName} {userStore.user.LastName}
                  <span className="positionRight"><EditTwoToneIcon onClick={()=>handleUserDetailsEdit()}/></span>
                  </Typography>

                  <Typography variant="h6"><PhoneIphoneOutlinedIcon style={{ color: "blue" }} />   {userStore.user.Phone}</Typography>
                  <Typography variant="h6"><EmailOutlinedIcon style={{ color: "blue" }} />   {userStore.user.Email}</Typography>
                </Grid>
              </Grid>
              {/* {isFetched? user.address.map((item)=><p>{item.AddressLine1}</p>):""} */}
              
              <Grid container>
               
               
                {(addressStore.address).map((add, index) =>

                  <Grid className={classes.AddressDiv} item xs={12} md={4} >
                    <Card className={classes.AddressDiv} >
                      {/* <Typography> Address : {index+1} <br/> {id.addressLine1}, {id.addressLine2}<br />{`${toFirstCharUppercase(id.city)}`}<br /> Pin: {id.pinCode}</Typography> */}
                      <Typography> Address Name : {add.AddressNickName}  
                      <span className="positionRight"><EditTwoToneIcon onClick={()=>handleAddressEdit(add)}/></span>
                      <br/>{add.FirstAddress}
                      <br/>{add.StreetDetails}
                      <br/>{add.City} Pin: {add.pincode} 
                      <br/>{add.Phone[0]}</Typography>
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
            <Dialog open={showAddAddressDialog} onClose={handleAddAddressDialogClose}>
              <DialogTitle>

              </DialogTitle>
              <DialogContent>
                <EditAddress modelOpen={closeModal} />
              </DialogContent>


            </Dialog></div>)
          : <Redirect to="/AddUserProfile" />}

<Hidden mdUp >
              <Footer history={history}/>
            </Hidden>
           <Spinner showSpinner={showSpinner}/>
      </div>

<Dialog open={showUserDetailsEditDialog} onClose={handleEditUserDialogClose}>
  <EditUserDetails userId={userStore.user.UserId} firstName={userStore.user.FirstName} lastName={userStore.user.LastName} email={userStore.user.Email}
                phoneNumber={userStore.user.Phone} branchId={userStore.user.branchid} ProfileUpdated={handleUserDetailsUpdated}/>
</Dialog>

<Dialog open={showAddressEditDialog} onClose={handleEditAddressDialogClose}>
<DialogTitle className={classes.root}>
                <IconButton className={classes.closeButton} aria-label="close" onClick={handleEditAddressDialogClose}>
                  <CloseIcon />
                </IconButton>
                Edit Address
              </DialogTitle>
  <EditAddress addressName={AddressToEdit.AddressNickName} addressLine1={AddressToEdit.FirstAddress} addressLine2={AddressToEdit.StreetDetails} phone={AddressToEdit.Phone[0]} 
          city={AddressToEdit.City} pinCode={AddressToEdit.pincode} AddressUpdated={handleAddressUpdated}/>
</Dialog>


    </div>

  )
}

