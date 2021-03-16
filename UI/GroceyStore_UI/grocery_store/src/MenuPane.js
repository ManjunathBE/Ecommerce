import React, { Fragment, useState } from 'react';
import { ToolbarMenuItems, toolbarMenuItmes } from './ToolbarMenuItems'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}))

export const MenuPane = (props) => {

    const classes = useStyles();
    if(window.location.pathname==='/login') return null
    return (
        <Fragment>
        <CssBaseline />
        <div className={classes.root}>
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper),
            }}
            open="true"
        >

            <List><ToolbarMenuItems history={props.history}/></List>

        </Drawer>
        </div>
        </Fragment>
    )

}