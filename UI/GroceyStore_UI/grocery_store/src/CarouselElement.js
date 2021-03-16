import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import {
    Card,
    CardMedia,
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    [theme.breakpoints.down('md')]: {
    
      width: '100%',
    
    },
    
  }
}))



export const CarouselElement = (props) =>{

  const classes = useStyles();

    useEffect(() => {
        fetchCarouselImages()
      }, [])
    
    
    const [bannerItems, setBannerItems] = useState([{"1":"e"},{"2":"t"},{"3":"r"}]);

    const fetchCarouselImages = ()=>{
        fetch('https://testapi.slrorganicfarms.com/master/getBannerAdvertisements',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': window.localStorage.token
            },
            body: JSON.stringify({branch_id:1})
          })
          .then(result => {
            console.log(result, 'fetch in login')
            if(result.status===200){
                result.json().then(body => {
                    setBannerItems(body.data)
                    console.log(body,'banner body')
                })
            }
          })
    }

    const banner =()=>{

    }

    return(
        <Carousel 
        className="Example"
        autoPlay="true"
        animation="true"
        indicators="true"
        timeout="7"
        navButtonsAlwaysVisible="true"
        swipe="true"
        // next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
        // prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
        // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
    >
        {
            bannerItems.map((item, index) => {
                return(
                    <Card >
                    <CardMedia className={classes.card}

                    image={item.BannerPicUrl}
                    style={{ height: "40vh"}}
                  />
                  </Card>
                )
            })
        }
    </Carousel>
    )

}