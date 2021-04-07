import React, { useState, useReducer } from "react"
import Picker from 'react-scrollable-picker';
import { TextField, Grid, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { useStore } from "./Store";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FlashMessage from 'react-flash-message'
import { isDesktop } from 'react-device-detect'

const useStyles = makeStyles((theme) => ({
    TextFieldMargin: {
        marginTop: "40%"
    },
    PickerMargin: {
        marginTop: "-40%"
    },
    TableMargin: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(0),
        alignItems: "center"
    }

}));


export const AddProduct = (props) => {
    console.log(props, 'props in add')
    const { cartStore, setCartStore } = useStore();
    const { productName, price, history, unitType, quantityToEdit, productId, unitTypeId } = props
    const [units, setUnits] = useState(1)
    const [isEnterWeightSetToManual, setIsEnterWeightSetToManual] = useState(false)
    const [quantityByManualEntry, setQuantityByManualEntry] = useState()
    const [quantityToDisplay, setQuantityToDisplay] = useState()
    const [showPriceAndQuantity, setShowPriceAndQuantity] = useState(false)
    const [errors, setErrors] = useState({})
    const [zeroQuantityWarning, setZeroQuantityWarning] = useState(false)



    var kgOptions = [];
    for (var i = 0; i <= 50; i++) {
        kgOptions.push({ value: i, label: i })
    }

    const [valueGroupsKG, setValueGroupsKG] = useState({
        Weight: 0
    })
    const [optionGroupsKG, setOptionGroupsKG] = useState({
        Weight: kgOptions
    })
    const [valueGroupsGrams, setValueGroupsGrams] = useState({
        Weight: 0
    })
    const [optionGroupsGrams, setOptionGroupsGrams] = useState({
        Weight: [
            { value: 0, label: '0' },
            { value: .100, label: '100' },
            { value: .200, label: '200' },
            { value: .250, label: '250' },
            { value: .300, label: '300' },
            { value: .400, label: '400' },
            { value: .500, label: '500' },
            { value: .600, label: '600' },
            { value: .750, label: '750' },
            { value: .800, label: '800' },
            { value: .900, label: '900' },
        ],
    })


    var numberOptions = [];
    for (var i = 0; i <= 100; i++) {
        numberOptions.push({ value: i, label: i })
    }
    const [valueGroupsNumbers, setValueGroupsNumbers] = useState({
        Weight: 0
    })
    const [optionsGroupsNumbers, setOptionGroupsNumbers] = useState({
        Weight: numberOptions
    })
    // var priceFormula;
    // if (unitType === 'Kilograms') {
    //     priceFormula = +price * (valueGroupsKG.Weight + valueGroupsGrams.Weight).toFixed(2)

    // }
    // else if (unitType === 'Numbers') {
    //     priceFormula = +price * valueGroupsNumbers.Weight.toFixed(2)

    // }
    const [calculatedPrice, setCalculatdPrice] = useState()

    const QuantitySelector = () => {

        if (unitTypeId === 1) {
            return (
                <Grid container spacing={3}>
                    <Grid xs={6}>
                        <Table classname={classes.TableMargin}>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align='center'
                                        paddingBottom='none'>
                                        <span style={{ textAlign: "center" }}>Kg</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        align='center'
                                        padding='none'>
                                        <Picker id="KgPicker" className={classes.PickerMargin}
                                            optionGroups={optionGroupsKG}
                                            valueGroups={valueGroupsKG}
                                            onChange={handleKGChange} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid xs={6}>
                        <Table classname={classes.TableMargin}>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align='center'
                                        padding='16px 16px 0px 16px'>
                                        <span style={{ textAlign: "center" }}>grams</span>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        align='center'
                                        padding='none'>
                                        <Picker id="GramsPicker" className={classes.PickerMargin}
                                            optionGroups={optionGroupsGrams}
                                            valueGroups={valueGroupsGrams}
                                            onChange={handleGramsChange} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            )
        }
        else if (unitTypeId === 2) {
            return (
                <div>
                    <Table classname={classes.TableMargin}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align='center'
                                    padding='16px 16px 0px 16px'>
                                    <span style={{ textAlign: "center" }}>Numbers</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    align='center'
                                    padding='none'>
                                    <Picker id="NumberPicker" className={classes.PickerMargin}
                                        optionGroups={optionsGroupsNumbers}
                                        valueGroups={valueGroupsNumbers}
                                        onChange={handleNumbersChange} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            )
        }

    }

    const ManualQuantityInput = () => {
        // if (unitType === "Kg") {
        return (

            <TextField
                variant="outlined"
                autoFocus
                fullWidth
                margin="normal"
                required
                id="manualWeight"
                label="Quantity"
                name="manualWeight"
                onChange={handleManualQuantityChange}
                error={errors.quantity}
                helperText={errors.quantity} />)
        /*{ <Input

            id="standard-adornment-weight"
            value={quantityByManualEntry}
            onChange={handleManualQuantityChange}
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
            'aria-label': 'weight',
        }}
            error={errors.quantity ? true : false}
        />
        <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
        <FormHelperText id="standard-weight-helper-text">{errors.quantity}</FormHelperText>} */


        // }
        // else if (unitType === 'Numbers') {
        //     return (<FormControl>
        //         <Input

        //             id="standard-adornment-weight"
        //             value={quantityByManualEntry}
        //             onChange={handleManualQuantityChange}
        //             endAdornment={<InputAdornment position="end">Num.</InputAdornment>}
        //             aria-describedby="standard-weight-helper-text"
        //             inputProps={{
        //                 'aria-label': 'weight',
        //             }}
        //         />
        //         <FormHelperText id="standard-weight-helper-text">Numbers</FormHelperText>
        //     </FormControl>)
        // }
    }

    const handleKGChange = (name, value) => {
        setZeroQuantityWarning(false)
        setValueGroupsKG({ Weight: value })
        setCalculatdPrice((price * (value + valueGroupsGrams.Weight)).toFixed(2))
        setQuantityToDisplay(value + valueGroupsGrams.Weight)
        setShowPriceAndQuantity(true)
    };

    const handleGramsChange = (name, value) => {
        setZeroQuantityWarning(false)
        setValueGroupsGrams({ Weight: value })
        setCalculatdPrice((price * (valueGroupsKG.Weight + value)).toFixed(2))
        setQuantityToDisplay(valueGroupsKG.Weight + value)
        setShowPriceAndQuantity(true)
    };

    const handleManualQuantityChange = (event) => {
        console.log(event.target.value, 'eventtt value')
        setQuantityByManualEntry(event.target.value)
        setCalculatdPrice((price * event.target.value).toFixed(2))
        setShowPriceAndQuantity(true)
    }

    const handleNumbersChange = (name, value) => {
        setZeroQuantityWarning(false)
        setValueGroupsNumbers({ Weight: value })
        setCalculatdPrice((price * value).toFixed(2))
        setQuantityToDisplay(value)
        setShowPriceAndQuantity(true)
    }

    const handleWeightTextInput = (event) => {
        setZeroQuantityWarning(false)
        setIsEnterWeightSetToManual(event.target.checked)
        setCalculatdPrice(0)
        setShowPriceAndQuantity(false)
    }

    const ValidateManualWeightInput = () => {
        console.log('here in validate')
        var temp = []
        if (isEnterWeightSetToManual || isDesktop) {
            console.log(props)
            if (unitTypeId === 1) {
                temp.quantity = (/^\d*(\.\d*)?$/).test(quantityByManualEntry) ? "" : "Invalid input. Only integers allowed"
                if(quantityByManualEntry==0) temp.quantity = "Invalid input. Quantity should not be zero"
            }
            else{
                temp.quantity = (/^([1-9][0-9]*)$/).test(quantityByManualEntry) ? "" : "Not a valid quantity. Special characters not allowed and should be greater than zero"
            }
            //temp.quantity = quantityByManualEntry ? "" : "Quantity is required "
            setErrors({ ...temp })
        }
        return Object.values(temp).every(param => param === "")
    }

    const addToCart = () => {
        var isUpdate = false
        var quantity, unit

        if (unitTypeId === 1) {
            if (isEnterWeightSetToManual && ValidateManualWeightInput()) {
                quantity = Number(quantityByManualEntry).toFixed(1)
            }
            else if (isDesktop && ValidateManualWeightInput()) {
                quantity = Number(quantityByManualEntry).toFixed(1)
            }
            else {
                quantity = valueGroupsKG.Weight + valueGroupsGrams.Weight
            }
            unit = 'KG'
        }
        else if (unitTypeId === 2) {
            if (isEnterWeightSetToManual && ValidateManualWeightInput()) {
                quantity = quantityByManualEntry
            }
            else if (isDesktop && ValidateManualWeightInput()) {
                quantity = quantityByManualEntry
            }
            else {
                quantity = valueGroupsNumbers.Weight
            }
            unit = 'Pc'
        }
        console.log(typeof (quantity), 'typeee')

        cartStore.cart.forEach(item => {
            if (item.productName === productName) {
                isUpdate = true
            }
        });

        console.log(quantity, 'quantity in add to cart')

        if (quantity == 0) {
            console.log('inside if quantity check')
            console.log(zeroQuantityWarning)

            setZeroQuantityWarning(true)
        }
        else {

            setZeroQuantityWarning(false)
            if (isUpdate) {
                console.log('am here in update cart')
                setCartStore({ productId, productName, quantity, unit, price: price * (quantity), itemPrice: price, unitTypeId: unitTypeId, type: 'Update' })
                props.modelOpen("false")
            }
            else {
                console.log('am here in add cart')
                setCartStore({ productId, productName, quantity, unit, price: price * (quantity), itemPrice: price, unitTypeId: unitTypeId, type: 'Add' })
                props.modelOpen("false")
            }
            setIsEnterWeightSetToManual(false)
            props.addToCart("true")
        }
    }

    const classes = useStyles()

    const getDeviceSpecificView = () => {
        if (isDesktop) {
            return ManualQuantityInput()
        }
        else {
            return (
                <>
                    {isEnterWeightSetToManual ? ManualQuantityInput() : QuantitySelector()}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isEnterWeightSetToManual}
                                onChange={handleWeightTextInput}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Enter Manually"
                    />

                </>
            )

        }
    }
    console.log(isDesktop, 'is it desktop')
    return (
        <div>

            {showPriceAndQuantity ?
                <div>
                    <span> Price: {calculatedPrice}</span>
                    <span className="positionRight">Quantity: {!isEnterWeightSetToManual ? quantityToDisplay : quantityByManualEntry} {unitType}</span>
                </div> : ""}
            {/* {zeroQuantityWarning ? <Typography style={{ color: 'red', align: 'center' }}>Quantity should be greater than zero</Typography> : ""} */}

            {getDeviceSpecificView()}



            <div className="text-center">
                <Button color="primary" variant="contained" onClick={addToCart}>Add to Cart</Button>
            </div>


        </div>
    )

}

