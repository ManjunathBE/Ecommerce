import React, { Component, useState } from "react"

import {
 Dialog, DialogContent, DialogTitle, TextField, Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export const MissingReturnItems =(props)=>{
    const classes = useStyles();
    const {selectedItem}= props

    const [missingReturnValue, setMissingReturnValue] = useState()
    
    var MissingReturnItemsList = []



    const handleMissingReturnQuantityChange = (event) => {
        setMissingReturnValue(event.target.value)
    }

    const handleMissingClick = () => {

        MissingReturnItemsList.push({
            OrderId:selectedItem.OrderId,
            Itemid:selectedItem.Itemid,
            qty:selectedItem.qty,
            ItemCost:selectedItem.ItemCost,
            SuppliedQty:{missingReturnValue},
            FinalAmount:"",
            MissingOrReturn:"Missing"
        })

    }

    const handleReturnClick = () => {

    }


    return (
        <React.Fragment>
        
    </React.Fragment>
    )
}