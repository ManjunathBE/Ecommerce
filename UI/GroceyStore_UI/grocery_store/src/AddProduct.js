import React, { useState, useReducer } from "react"
import Picker from 'react-scrollable-picker';
import { TextField, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { useStore } from "./Store";

const useStyles = makeStyles((theme) => ({
    TextFieldMargin: {
        marginTop: "40%"

    },
    PickerMargin: {
        marginTop: "-40%"
    }
}));



export const AddProduct = (props) => {
    console.log(props,'propsss')
   const {cart, setCart} = useStore();
    console.log(props.price, 'priceeee')
    const { productName, price,history } = props
    const [units, setUnits] = useState(1)
    const [valueGroups, setValueGroups] = useState({
        Weight: '500'
    })
    const [optionGroups, setOptionGroups] = useState({
        Weight: [
            { value: '250', label: '250 gm' },
            { value: '500', label: '500 gm' },
            { value: '750', label: '750 gm' },
            { value: '1000', label: '1kg' },

        ],
    })

    //const [finalProductPrice, setFinalProductPrice] = useState((price * (valueGroups.Weight / 1000)) * units)

    const handleChange = (name, value) => {
        setValueGroups({ Weight: value })
        //setFinalProductPrice((price * (valueGroups.Weight / 1000)) * units)
    };

    const handleUnitsChange = (event) => {
        console.log('herere', units)
        setUnits(event.target.value)
        //setFinalProductPrice((price * (valueGroups.Weight / 1000)) * units)
    }

    const addToCart = () => {
        const weight = valueGroups.Weight
        console.log(productName, ' ', ' ', valueGroups.Weight, units)
        if(cart.length===0) {setCart({productName, weight, units, type:'Add'})}
        cart.forEach(item => {
            if(item.productName===productName){
                setCart({productName, weight, units, type:'Update'})
            }
            else{
                setCart({productName, weight, units, type:'Add'})
            }
        });
        
    
    }

    const classes = useStyles()

    return (
        <div>
           
            Price: {(price * (valueGroups.Weight / 1000)) * units}

            <Grid container spacing={3}>
                <Grid xs={6}>
                    <Picker id="weightPicker" className={classes.PickerMargin}
                        optionGroups={optionGroups}
                        valueGroups={valueGroups}
                        onChange={handleChange} />
                </Grid>

                <Grid xs={6}>

                    <TextField className={classes.TextFieldMargin}
                        onChange={handleUnitsChange}
                        id="outlined-number"
                        label="Units"
                        type="number"
                        defaultValue="1"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid  >
            <Button onClick={addToCart}>Add to Cart</Button>
        </div>
    )

}

