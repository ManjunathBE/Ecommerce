import React, { Component } from "react";
import { Header } from './Header'
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import { Grid, Hidden } from "@material-ui/core";
import { useStore } from "./Store";
import { makeStyles } from "@material-ui/core/styles";
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({
    gridPosition: {
      paddingTop: "10%",
      paddingLeft: "10%",
      paddingRight: "10%",
    }
  }));

export const SelectView = (props) => {

    const {history} = props
    const classes = useStyles();
    const {viewStore, setviewStore} = useStore();

    const handleListView = () =>{

        setviewStore({view:'List'})
        history.push('/')
    }

    const handleGridView = () =>{
        setviewStore({view:'Grid'})
        history.push('/')
    }


    return (
      <React.Fragment>
            <Header title={(props.location.pathname).substring(1)} history={props.history} />
            <div className="text-center">
                Select from the options below
            <Grid container  spacing={3} className={classes.gridPosition}>
                <Grid  xs={6} onClick={handleListView}>
                    <ListIcon  /> List View
               </Grid>
                <Grid  xs={6} onClick={handleGridView}>
                    <AppsIcon /> Grid View
               </Grid>
            </Grid>
            <Hidden mdUp >
              <Footer history={history}/>
            </Hidden>
        </div>
        </React.Fragment>
    )
}


