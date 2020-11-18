import React, { useState, useEffect } from "react"
import { Header } from '../Header'
import { Address } from './Address'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export const UserProfile = (props) => {

  useEffect(() => {
    fetchUserDetails()
  }, [])
  const [user, setUser] = useState({})
  const [isFetched, setIsFetched] = useState(false)
  const { history } = props;
  const fetchUserDetails = () => {

    fetch('https://localhost:44360/api/user?userid=1',
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
            setUser(body)
            setIsFetched(true)
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }
  console.log(user.address, 'user address')
  console.log(user.email, 'user email')

  return (
    <div>
      <Header title={(props.location.pathname).substring(1)} history={props.history} />

      <Typography>Name : {user.firstName} {user.lastName}</Typography>
      <Typography>Mobile : {user.phoneNumber}</Typography>
      <Typography>Email :  {user.email}</Typography>

      {/* {isFetched? user.address.map((item)=><p>{item.AddressLine1}</p>):""} */}
      {isFetched ? (user.address).map((id) => <Typography>Address : {id.addressLine1} <br />{id.addressLine2}<br />{id.city}<br />{id.pinCode}</Typography>)
        : ""}

<Button 
onClick={()=>history.push({pathname: '/Edit User Profile',
                          state: {user:user}})}>
  Edit Profile
</Button>
    </div>
  )
}

