import React, { useState } from "react"
import Picker from 'react-scrollable-picker';
import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    TextFieldMargin: {
        marginTop: "40%"

    },
    PickerMargin: {
        marginTop: "-40%"
    }
}));


export const AddProduct = (props) => {

    const [valueGroups, setValueGroups] = useState({
        Weight: '500 gm'
    })
    const [optionGroups, setOptionGroups] = useState({
        Weight: [
            { value: '250 gm', labeladding: '250 gm' },
            { value: '500 gm', label: '500 gm' },
            { value: '750 gm', label: '750 gm' },
            { value: '1 kg', label: '1kg' },
        ],
    })

    const handleChange = (name, value) => {
        setValueGroups({ Weight: value })
    };

    const classes = useStyles()

    return (
        <div>
            <Grid container spacing={3}>
                <Grid xs={6}>
                    <Picker id="weightPicker" className={classes.PickerMargin}
                        optionGroups={optionGroups}
                        valueGroups={valueGroups}
                        onChange={handleChange} />
                </Grid>

                <Grid xs={6}>

                    <TextField className={classes.TextFieldMargin}
                        id="outlined-number"
                        label="Units"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid  >
        </div>
    )

}

