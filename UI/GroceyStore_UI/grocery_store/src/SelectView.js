import React, { Component } from "react";
import { Header } from './Header'
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import { Grid } from "@material-ui/core";
import { useStore } from "./Store";


export const SelectView = (props) => {
    const {viewStore, setviewStore} = useStore();

    const handleListView = () =>{

        setviewStore({view:'List'})
        props.history.push('/')
    }

    const handleGridView = () =>{
        setviewStore({view:'Grid'})
        props.history.push('/')
    }


    return (
        <div>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />
                Select from the options below
            <Grid container  spacing={3}>
                <Grid  xs={6} onClick={handleListView}>
                    <ListIcon  /> List View
               </Grid>
                <Grid  xs={6} onClick={handleGridView}>
                    <AppsIcon /> Grid View
               </Grid>
            </Grid>
        </div>
    )
}


