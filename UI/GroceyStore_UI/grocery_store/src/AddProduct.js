import React, { useState, useReducer } from "react"
import Picker from 'react-scrollable-picker';
import { TextField, Grid, Table, TableContainer, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { useStore } from "./Store";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


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
    const { productName, price, history, unitType, quantityToEdit, productId } = props
    const [units, setUnits] = useState(1)
    const [isEnterWeightSetToManual, setIsEnterWeightSetToManual] = useState(false)
    const [quantityByManualEntry, setQuantityByManualEntry] = useState()
    const [quantityToDisplay, setQuantityToDisplay] = useState()
    const [showPriceAndQuantity, setShowPriceAndQuantity] = useState(false)
    


    const [valueGroupsKG, setValueGroupsKG] = useState({
        Weight: 2
    })
    const [optionGroupsKG, setOptionGroupsKG] = useState({
        Weight: [
            { value: 0, label: '0' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 6, label: '6' },
            { value: 7, label: '7' },
            { value: 8, label: '8' },
        ],
    })
    const [valueGroupsGrams, setValueGroupsGrams] = useState({
        Weight: .250
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
    for (var i = 1; i <= 100; i++) {
        numberOptions.push({ value: i, label: i })
    }
    const [valueGroupsNumbers, setValueGroupsNumbers] = useState({
        Weight: 5
    })
    const [optionsGroupsNumbers, setOptionGroupsNumbers] = useState({
        Weight: numberOptions
    })
    var priceFormula;
    if (unitType === 'Kilograms') {
        priceFormula = (price * (valueGroupsKG.Weight + valueGroupsGrams.Weight))

    }
    else if (unitType === 'Numbers') {
        priceFormula = (price * valueGroupsNumbers.Weight)

    }
    const [calculatedPrice, setCalculatdPrice] = useState(priceFormula)

    const QuantitySelector = () => {

        if (unitType === "Kg") {
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
        else if (unitType === 'Numbers') {
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
        if (unitType === "Kg") {
            return (<FormControl>
                <Input

                    id="standard-adornment-weight"
                    value={quantityByManualEntry}
                    onChange={handleManualQuantityChange}
                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
            </FormControl>)
        }
        else if (unitType === 'Numbers') {
            return (<FormControl>
                <Input

                    id="standard-adornment-weight"
                    value={quantityByManualEntry}
                    onChange={handleManualQuantityChange}
                    endAdornment={<InputAdornment position="end">Num.</InputAdornment>}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="standard-weight-helper-text">Numbers</FormHelperText>
            </FormControl>)
        }
    }

    const handleKGChange = (name, value) => {
        setValueGroupsKG({ Weight: value })
        setCalculatdPrice(price * (value + valueGroupsGrams.Weight))
        setQuantityToDisplay(value + valueGroupsGrams.Weight)
        setShowPriceAndQuantity(true)
    };

    const handleGramsChange = (name, value) => {
        setValueGroupsGrams({ Weight: value })
        setCalculatdPrice(price * (valueGroupsKG.Weight + value))
        setQuantityToDisplay(valueGroupsKG.Weight + value)
        setShowPriceAndQuantity(true)
    };

    const handleManualQuantityChange = (event) => {
        console.log(event.target.value, 'eventtt value')
        setQuantityByManualEntry(event.target.value)
        setCalculatdPrice(price * event.target.value)
        setShowPriceAndQuantity(true)
    }

    const handleNumbersChange = (name, value) => {
        setValueGroupsNumbers({ Weight: value })
        setCalculatdPrice(price * value)
        setQuantityToDisplay(value)
        setShowPriceAndQuantity(true)
    }

    const handleWeightTextInput = (event) => {
        setIsEnterWeightSetToManual(event.target.checked)
        setCalculatdPrice(0)
        setShowPriceAndQuantity(false)
    }

    const addToCart = () => {
        var isUpdate = false
        var quantity, unit

        if (unitType === 'Kg') {
            if (isEnterWeightSetToManual) {
                quantity = quantityByManualEntry
            }
            else {
                quantity = valueGroupsKG.Weight + valueGroupsGrams.Weight
            }
            unit = 'Kg'
        }
        else if (unitType === 'Numbers') {
            if (isEnterWeightSetToManual) {
                quantity = quantityByManualEntry
            }
            else {
                quantity = valueGroupsNumbers.Weight
            }
            unit = 'Numbers'
        }
        console.log(typeof (quantity), 'typeee')

        cartStore.cart.forEach(item => {
            if (item.productName === productName) {
                isUpdate = true
            }
        });

        if (isUpdate) {
            setCartStore({ productId, productName, quantity, unit, price: price * (quantity), type: 'Update' })
            props.modelOpen("false")
        }
        else {
            setCartStore({ productId, productName, quantity, unit, price: price * (quantity), type: 'Add' })
            props.modelOpen("false")
        }
        setIsEnterWeightSetToManual(false)
        props.addToCart("true")



    }

    const classes = useStyles()
    return (
        <div>
            {showPriceAndQuantity ?
                <div>
                    <span> Price: {calculatedPrice}</span>
                    <span className="positionRight">Quantity: {!isEnterWeightSetToManual ? quantityToDisplay : quantityByManualEntry} {unitType}</span>
                </div> : ""}

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

            <div className="text-center">
                <Button color="primary" variant="contained" onClick={addToCart}>Add to Cart</Button>
            </div>


        </div>
    )

}

