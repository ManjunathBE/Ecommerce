import { TextField, Typography, Button, Container } from "@material-ui/core";
import React, { Component, useState } from "react";
import { Header } from './Header'
import { useStore } from "./Store";
import FlashMessage from 'react-flash-message'

export const Suggestion = (props) => {
    const [suggestion, setSuggestion] = useState("")
    const { userStore } = useStore();
    const [showFlashMessage, setShowFlashMessage] = useState(false)
    
    const handleSuggestionInput=(event)=>{
        setShowFlashMessage(false)
        setSuggestion(event.target.value)
    }

    const handleSubmit = () =>{
        var date = new Date();
        const payload = {
            UserId:userStore.user.UserId,
            SugDate:date.toLocaleDateString(),
            Description:suggestion
            }
          console.log(payload,'suggestion payload')
        fetch('https://testapi.slrorganicfarms.com/user/setSuggestion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': window.localStorage.token
            },
            body: JSON.stringify(payload)
          })
          .then(result => { if(result.status===200)
            result.json().then(body => {
              if (body.success === true) {
              setSuggestion("")
              console.log(body, 'result from backend')             
              setShowFlashMessage(true)

              }
              else{
                  //TODO: handle or show error
              }
            })
          })
    }
    return (
      <Container>
        <React.Fragment>
            {showFlashMessage? <div >
                  <FlashMessage duration={5000} >
                    <div className='flashStyling text-center'>
                      Suggestion sent
                        </div>
                  </FlashMessage>
                </div>: ""}


            <Typography>
                We always like to hear from our customers. Send us your thoughts, we will get back to you as soon as we can.
            </Typography>
            <TextField
          id="standard-multiline-static"
          multiline
          fullWidth
          rows={10}
          placeholder="your suggestions here"
          onChange={handleSuggestionInput}
          value={suggestion}
        />
        <Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
        <Button color="primary" variant="contained" onClick={()=>setSuggestion('')}>Clear</Button>
        </React.Fragment>
        </Container>
    )
}