import { Container } from "@material-ui/core";
import React, { Component, useState, useEffect } from "react";

export const AboutUs =(props)=>{

   const[data, setData]=useState()

useEffect(() => {
   fetchData()
}, [])

const fetchData=()=>{
   const payload = {
      branchId:1
    }

    fetch('https://testapi.slrorganicfarms.com/profile/getBranchDetails',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.token
      },
      body: JSON.stringify(payload)
    })
    .then(result => {
      console.log(result, 'result ')
      if (result.status === 404) {
        console.log('result is 404')

      } else if (result.status !== 200) {
        console.log('result is not 200')

      } else {
        result.json().then(body => {
          if (body.success !== true) {
            console.log('request failed', body)

          } else {
            console.log(body, 'response')
            setData(body.data[0].About)
           
          }
        });
      }
    })
    .catch(error => {
      console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    });
}

return(
   <div>
      <Container>
      {data}
      </Container>
   </div>
)
}