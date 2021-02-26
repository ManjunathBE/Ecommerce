import React, { useEffect, useState } from "react";
import { useStore } from "./Store";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Grid, Switch, Button,
    Paper, Hidden, Container, Dialog, DialogContent, DialogTitle, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer'
import { MenuPane } from './MenuPane'
import { Header } from './Header'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {MissingReturnItems} from './MissingReturnItems'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',

    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(9),
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));


export const HistoricOrderDetails = (props) => {

    const { cartStore, setCartStore, userStore } = useStore();
    const [orderDetails, setOrderDetails] = useState([])
    const [isToggleOn, setIsToggleOn] = useState(false)
    //const [showToggleSwitch, setShowToggleSwitch] = useState(false)
    const classes = useStyles();
    const { history } = props
    const [showMissingReturnOption, setShowMissingReturnOption] = useState(false)
    const [selectedItemForMissingReturn, setSelectedItemForMissingReturn] = useState()
    const [missingReturnValue, setMissingReturnValue] = useState()
    
    var MissingReturnItemsList = []


    const Headers = [
        { id: 'Product', numeric: false, disablePadding: true, label: 'Product Name' },
        { id: 'Price', numeric: true, disablePadding: true, label: 'Price' },
        { id: 'Quantity', numeric: true, disablePadding: true, label: 'Quantity' },
        // { id: 'Units', numeric: true, disablePadding: true, label: 'Units' },
    ]


    useEffect(() => {
        fetchOrderDetails()
    }, [])

    const fetchOrderDetails = () => {
        console.log(props, 'props in historic items')

        fetch('https://testapi.slrorganicfarms.com/cart/getOrderItemDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.localStorage.token
            },
            body: JSON.stringify({
                OrderId: props.location.state.orderId,
                UserId: userStore.user.UserId
            })
        })
            .then(result => {
                if (result.status === 404) {
                    console.log('result is 404')
                } else if (result.status !== 200) {
                    console.log('result is not 200')
                } else {
                    result.json().then(body => {
                        if (body.success !== true) {
                            console.log('request failed', body)
                        } else {
                            console.log(body.data, 'data of order')
                            setOrderDetails(body.data)
                        }
                    });
                }
            })
            .catch(error => {
                console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
            });

    }

    const showActionButtons = () => {
        console.log(props.location.state.orderStatus, 'order status')
        if (props.location.state.orderStatus === 'Order Booked') {
            return (<Button variant="contained" color="primary" onClick={handleEditOrReorder}>Edit</Button>)
        }
        else if (props.location.state.orderStatus === 'Completed') {
            return (<Button variant="contained" color="primary" onClick={handleEditOrReorder}>Reorder</Button>)
        }
        else if (props.location.state.orderStatus === 'Out for Delivery') {
            return (<React.Fragment>
                <Button variant="contained" color="primary" onClick={handleFinishOrder}>Finish</Button></React.Fragment>)
        }
    }

    const showToggleSwitch = () => {
        if (props.location.state.orderStatus === 'Out for Delivery') {
            return (
                <Grid container direction='row' align="center">
                    <Grid xs={3}>
                        <Typography align="right">Ordered</Typography></Grid>
                    <Grid xs={1} align="center"><Switch onChange={handleSwitchChange} checked={isToggleOn} /></Grid>
                    <Grid xs={3}><Typography align="left">Supplied</Typography></Grid>
                </Grid>
            )
        }

        else {
            return ""
        }
    }

    const handleEditOrReorder = () => {

    }

    const handleItemClick = (item) => {
        console.log(item)
        
        if (props.location.state.orderStatus === 'Out for Delivery') {
             setShowMissingReturnOption(true)
             setSelectedItemForMissingReturn(item)
            
        }
    }


    const handleSwitchChange = (event) => {
        setIsToggleOn(event.target.checked)
    }

    const handleDialogClose = () => {
        setShowMissingReturnOption(false)
    }

    const handleMissingReturnQuantityChange = (event) => {
        setMissingReturnValue(event.target.value)
    }

    const handleMissingClick = () => {

        MissingReturnItemsList.push({
            OrderId:selectedItemForMissingReturn.OrderId,
            Itemid:selectedItemForMissingReturn.Itemid,
            qty:selectedItemForMissingReturn.qty,
            ItemCost:selectedItemForMissingReturn.ItemCost,
            SuppliedQty:{missingReturnValue},
            FinalAmount:selectedItemForMissingReturn.MRP_Price*(selectedItemForMissingReturn.qty-selectedItemForMissingReturn.SuppliedQty),
            MissingOrReturn:"Missing"
        })
        setShowMissingReturnOption(false)

    }

    const handleReturnClick = () => {
        MissingReturnItemsList.push({
            OrderId:selectedItemForMissingReturn.OrderId,
            Itemid:selectedItemForMissingReturn.Itemid,
            qty:selectedItemForMissingReturn.qty,
            ItemCost:selectedItemForMissingReturn.ItemCost,
            SuppliedQty:{missingReturnValue},
            FinalAmount:selectedItemForMissingReturn.MRP_Price*(selectedItemForMissingReturn.qty-selectedItemForMissingReturn.SuppliedQty),
            MissingOrReturn:"Return"
        })
        setShowMissingReturnOption(false)

    }

    const handleFinishOrder=()=>{
        
    }
    return (
        <div>
            {/* <Header title={(props.location.pathname).substring(1)} history={props.history} /> */}
            <Paper className={classes.root}>
                {/* <Hidden smDown>
                    <MenuPane history={history} />
                </Hidden> */}
                <main className={classes.content}>
                    <Container maxWidth="lg">


                        <div className={classes.container}>
                            {showToggleSwitch()}

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Headers.map((headCell) => (
                                                <TableCell
                                                    key={headCell.id}
                                                    align='center'
                                                    padding={headCell.disablePadding ? 'none' : 'default'}
                                                >
                                                    {headCell.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>

                                    </TableHead>
                                    <TableBody>
                                        {!isToggleOn ?
                                            orderDetails.map((p) => {
                                                return (
                                                    <TableRow onClick={()=>handleItemClick(p)}>
                                                        <TableCell align='center'>{p.ItemName}</TableCell>
                                                        <TableCell align='center'>{p.ItemCost}</TableCell>
                                                        <TableCell align='center'>{p.qty}</TableCell>
                                                        {/* <TableCell>{p.unit}</TableCell> */}
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            orderDetails.map((p) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align='center'>{p.ItemName}</TableCell>
                                                        <TableCell align='center'>{p.FinalAmount}</TableCell>
                                                        <TableCell align='center'>{p.SuppliedQty}</TableCell>
                                                        {/* <TableCell>{p.unit}</TableCell> */}
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        {showActionButtons()}
                    </Container>
                </main>

                <Hidden mdUp >
                    <Footer history={history} />
                </Hidden>
            </Paper>

            <Dialog onClose={handleDialogClose} open={showMissingReturnOption}>
        <DialogTitle className={classes.root}>
            <IconButton className={classes.closeButton} aria-label="close" onClick={handleDialogClose}>
                <CloseIcon />
            </IconButton>
        Missing/Return
      </DialogTitle>
        <DialogContent dividers>
            {/* <MissingReturnItems selectedItem={selectedItemForMissingReturn}/> */}
            <TextField onchange={handleMissingReturnQuantityChange} /> <br />
        <Button variant="contained" color="primary" onClick={handleMissingClick}>Missing</Button>
        <Button variant="contained" color="primary" onClick={handleReturnClick}>Return</Button>
        </DialogContent>
    </Dialog>
           
        </div>



    )
}