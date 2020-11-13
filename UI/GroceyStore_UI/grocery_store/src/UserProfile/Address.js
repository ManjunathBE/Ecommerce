import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';


export const Address = (props) => {

    return (
        <div>
            <TextField
                margin="normal"
                required
                id="Address"
                label="Address Line 1"
                name="Address1"
                autoFocus
            />

            <TextField
                margin="normal"
                id="Address"
                label="Address Line 2"
                name="Address2"

            />
            <TextField
                margin="normal"
                required
                id="City"
                label="City"
                name="City"

            />
            <TextField
                margin="normal"
                required
                id="Pin"
                label="Pin code"
                name="pinnCode"
                type="number"

            />
        </div>
    )
}

