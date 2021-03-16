import React, { Component } from "react"
import { List, Grid, Typography } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


export const Footer = (props) => {
    const { history } = props
    

    return (
        <Grid id='footer' container spacing={2} style={{textAlign: "center"}}>
            <Grid item xs={3} onClick={()=>history.push('/userprofile')}>
                <DashboardIcon /><br />
                <Typography>Profile</Typography>
            </Grid>
            <Grid item xs={3} onClick={()=>history.push('/History')}>
                <ShoppingCartIcon/><br />
                    <Typography>History</Typography>
            </Grid>
                <Grid item xs={3} onClick={()=>history.push('/Cart')}>
                <ShoppingCartIcon/><br />
                    <Typography>Cart</Typography>
                </Grid>
                <Grid item xs={3} onClick={()=>history.push('/Payment')}>
                    <DashboardIcon /><br />
                    <Typography>Payment</Typography>
                </Grid>
            </Grid>
    )
}


export default Footer
