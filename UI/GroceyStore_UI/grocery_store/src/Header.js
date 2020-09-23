import React, { Component } from "react"
import { Grid } from "@material-ui/core"
import HomeIcon from '@material-ui/icons/Home';


export const Header = (props) => {
    const { history } = props;
    console.log('props in header', props)

    return (
        <div id="header">
            <Grid container>
                <Grid xs={3}>
                    <HomeIcon onClick={() => history.push('/')} />
                </Grid>
                <Grid xs={6}>
                    <p className="headerTitle">
                        {props.title}
                    </p>
                </Grid>
                <Grid xs={3}>
                </Grid>
            </Grid>
        </div>
    )
}
