import React, { useEffect, useState } from "react";
import { useStore } from "./Store";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, Grid, Switch, Button,
    Paper, Hidden, Container, Dialog, DialogContent, DialogTitle, TextField, AccordionSummary, AccordionDetails, Accordion
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer'
import IconButton from '@material-ui/core/IconButton';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MissingReturnItems } from './MissingReturnItems'

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
            padding: theme.spacing(1),
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: 'red',
    },
    addressDiv: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btnMargin: {
        marginRight: theme.spacing(2)
    },
    table: {
        marginBottom: theme.spacing(10),
        marginTop: theme.spacing(3)
    },
    topMargin: {
        marginTop: theme.spacing(2),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightBold,
      },
}));


export const HistoricOrderDetails = (props) => {

    const { cartStore, setCartStore, userStore } = useStore();
    const [orderDetails, setOrderDetails] = useState([])
    const [isToggleOn, setIsToggleOn] = useState(false)
    const classes = useStyles();
    const { history } = props
    const [showMissingReturnOption, setShowMissingReturnOption] = useState(false)
    const [selectedItemForMissingReturn, setSelectedItemForMissingReturn] = useState()
    const [missingReturnValue, setMissingReturnValue] = useState()
    const [warningDialog, setWarningDialog] = useState(false)
    const [showCancellationConfirmationDialog, setShowCancellationConfirmationDialog] = useState(false)
    const [billUrl,setBillurl] = useState()

    var MissingReturnItemsList = []


    const Headers = [
        { id: 'Sl.No', numeric: true, disablePadding: true, label: 'Sl.No' },
        { id: 'Product', numeric: false, disablePadding: true, label: 'Product' },
        { id: 'Quantity', numeric: true, disablePadding: true, label: 'Quantity' },
        { id: 'Unit', numeric: true, disablePadding: true, label: 'Unit' },
        { id: 'Price', numeric: true, disablePadding: true, label: 'Price (₹)' },
        { id: 'Instructions', numeric: true, disablePadding: true, label: 'Instructions' },
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
                            setOrderDetails(body.data)
                            setBillurl(body.data2[0].BillUrl)
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
            return (<React.Fragment><Button className={classes.btnMargin} variant="contained" color="primary" onClick={() => handleEditOrReorder('edit')}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={handleCancelOrderClick} >Cancel order</Button> 
                </React.Fragment>)
        }
        else if (props.location.state.orderStatus === 'Completed' ) {
            return (<><Button className={classes.btnMargin} variant="contained" color="primary" onClick={() => handleEditOrReorder('reorder')}>Re-order</Button>
            <a rel={'noopener noreferrer'}  href={billUrl} target="_blank">
            <Button variant="contained" color="primary" >Download Invoice</Button>
            </a></>)
        }
        else if ( props.location.state.orderStatus === 'Order Cancelled'){
            return (<Button className={classes.btnMargin} variant="contained" color="primary" onClick={() => handleEditOrReorder('reorder')}>Re-order</Button>)
        }
        else if (props.location.state.orderStatus === 'Out for Delivery') {
            return (<React.Fragment>
                <Button className={classes.btnMargin} variant="contained" color="primary" onClick={handleFinishOrder}>Received</Button></React.Fragment>)
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

    const handleEditOrReorder = (type) => {
        // e.preventDefault()

        console.log(type, '...flag..')
        console.log(cartStore.cart.length, 'cart in edit')
        if (cartStore.cart.length !== 0) {
            setWarningDialog(true)
        }
        else {
            console.log(orderDetails, 'orderdetails in history')
            orderDetails.map((item) => setCartStore({ item, type: 'AddFromHistory' }))
            history.push({
                pathname: `/cart`,
                state: { 'flag': type }
            })
        }
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
            OrderId: selectedItemForMissingReturn.OrderId,
            Itemid: selectedItemForMissingReturn.Itemid,
            qty: selectedItemForMissingReturn.qty,
            ItemCost: selectedItemForMissingReturn.ItemCost,
            SuppliedQty: { missingReturnValue },
            FinalAmount: selectedItemForMissingReturn.MRP_Price * (selectedItemForMissingReturn.qty - selectedItemForMissingReturn.SuppliedQty),
            MissingOrReturn: "Missing"
        })
        setShowMissingReturnOption(false)

    }

    const handleReturnClick = () => {
        MissingReturnItemsList.push({
            OrderId: selectedItemForMissingReturn.OrderId,
            Itemid: selectedItemForMissingReturn.Itemid,
            qty: selectedItemForMissingReturn.qty,
            ItemCost: selectedItemForMissingReturn.ItemCost,
            SuppliedQty: { missingReturnValue },
            FinalAmount: selectedItemForMissingReturn.MRP_Price * (selectedItemForMissingReturn.qty - selectedItemForMissingReturn.SuppliedQty),
            MissingOrReturn: "Return"
        })
        setShowMissingReturnOption(false)

    }

    const handleFinishOrder = () => {
        console.log(props, 'props in historic order')

        fetch('https://testapi.slrorganicfarms.com/cart/SetOrderClosed', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.localStorage.token
            },
            body: JSON.stringify({ OrderId: props.location.state.orderId })
        })
            .then(result => {
                if (result.status === 200)
                    result.json().then(body => {
                        if (body.success === true) {
                            history.push({
                                pathname: "/history",
                                state: { finishOrder: true }
                            })
                        }
                        else {
                            //TODO: handle some error occured
                        }
                    })
            })
    }

    const handleWarningDialogClose = () => {
        setWarningDialog(false)
    }

    const handleProceedToCart = () => {
        console.log(orderDetails, 'orderdetails in history')
        setCartStore({ type: 'DeleteAll' })
        orderDetails.map((item) => setCartStore({ item, type: 'AddFromHistory' }))
        history.push(`/cart`)
    }

    const handleCancelOrderClick = () => {
        setShowCancellationConfirmationDialog(true)

    }

    const handleCancelOrder = () => {

        fetch('https://testapi.slrorganicfarms.com/cart/CancelOrder', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': window.localStorage.token
            },
            body: JSON.stringify({
                OrderId: props.location.state.orderId
            })
        })
            .then(result => {
                if (result.status === 200)
                    result.json().then(body => {
                        if (body.success === true) {
                            console.log(body, 'result from backend')
                            history.goBack()
                        }
                        else {
                            //TODO: handle some error occured
                        }
                    })
            })


    }

    console.log(orderDetails, 'order details in hitem history')
    let totalEstimatedPrice = 0
    let totalSuppliedPrice = 0
    const calculateTotalPrice = (variant) => {
        if (variant === 'estimated') {
            orderDetails.map(x =>
                totalEstimatedPrice = totalEstimatedPrice + x.ItemCost
            )
            return totalEstimatedPrice.toFixed(2)
        }
        else {
            orderDetails.map(p =>
                totalSuppliedPrice = totalSuppliedPrice + (p.SellIngPrice * p.SuppliedQty)
            )
            return totalSuppliedPrice.toFixed(2)
        }
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
                            <Button className={classes.btnMargin} variant="contained" color="primary" onClick={() => history.goBack()}>Back</Button>
                            {showActionButtons()}

                            <Grid className={classes.topMargin} container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Delivery Address</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={classes.addressDiv}>
                                                {orderDetails.length ?
                                                    <React.Fragment>
                                                        <Typography style={{ fontWeight: 'bold' }}>Delivery Address</Typography>

                                                        <Typography>{orderDetails[0].AddressNickName}<br />
                                                            {orderDetails[0].FirstAddress}<br />
                                                            {orderDetails[0].StreetDetails}<br />
                                                            {orderDetails[0].City} - {orderDetails[0].pincode} <br />
                                GSTIN: {orderDetails[0].GST}<br />
                                                            <br />{orderDetails[0].ContactPerson}<br />
                                Phone: {orderDetails[0].Phone}
                                                        </Typography></React.Fragment> : ""}
                                            </div>

                                        </AccordionDetails>
                                    </Accordion>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Order Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={classes.addressDiv}>
                                                {orderDetails.length ?
                                                    <React.Fragment>
                                                        <Typography> <span style={{ fontWeight: 'bold' }}> Order Number : </span>{props.location.state.orderId}</Typography>
                                                        <Typography> <span style={{ fontWeight: 'bold' }}> Order Status : </span>{orderDetails[0].OrderStatus}</Typography>
                                                        <br />
                                                        {!isToggleOn ? <div>Estimated price:{calculateTotalPrice('estimated')}</div> : <div>Total price:{calculateTotalPrice('total')}</div>}
                                                        </React.Fragment>: ""}
                                            </div>

                                        </AccordionDetails>
                                    </Accordion>

                                    

                                </Grid>

                            </Grid>




                            {showToggleSwitch()}
                           
                            <TableContainer>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            {Headers.map((headCell) => (
                                                <TableCell style={{fontWeight:'bold'}}
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
                                            orderDetails.map((p, index) => {

                                                return (
                                                    <TableRow onClick={() => handleItemClick(p)}>
                                                        <TableCell align='center'>{index + 1}</TableCell>
                                                        <TableCell align='center'>{p.ItemName}</TableCell>
                                                        <TableCell align='center'>{p.qty}</TableCell>
                                                        <TableCell align='center'>{p.UnitName}</TableCell>
                                                        <TableCell align='center'>{p.ItemCost.toFixed(2)}</TableCell>
                                                        <TableCell>{p.Instructions}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            :
                                            orderDetails.map((p, index) => {
                                                var isDifferent = false

                                                if (p.ItemCost !== (p.SellIngPrice * p.SuppliedQty)) isDifferent = true
                                                return (
                                                    <TableRow style={{ backgroundColor: isDifferent ? 'lightpink' : 'white' }}>
                                                        <TableCell align='center'>{index + 1}</TableCell>
                                                        <TableCell align='center'>{p.ItemName}</TableCell>
                                                        <TableCell align='center'>{p.SuppliedQty}</TableCell>
                                                        <TableCell align='center'>{p.UnitName}</TableCell>
                                                        <TableCell align='center'>{(p.SellIngPrice * p.SuppliedQty).toFixed(2)}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>

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

            <Dialog onClose={handleWarningDialogClose} open={warningDialog}>
                <DialogTitle>
                    <IconButton className={classes.closeButton} aria-label="close" onClick={handleDialogClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="text-center">
                        <ReportProblemOutlinedIcon style={{ fontSize: '80px', color: 'orangered' }} />
                        <br />
                        <Typography className={classes.topMargin}>The items in your cart will be deleted</Typography>
                        <br />
                        <Button className={classes.topMargin} variant="contained" color="primary" onClick={handleProceedToCart}>Proceed</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showCancellationConfirmationDialog}>
                <DialogTitle>
                </DialogTitle>
                <DialogContent>
                    <div className="text-center">
                        <Typography>Do you want to cancel this order?</Typography>
                    </div>
                    <br />
                    <div className={classes.topMargin} style={{ textAlign:'center'}}>
                        <Button className={classes.btnMargin} variant="contained" color="secondary" onClick={handleCancelOrder}> Yes </Button>
                        <Button  variant="contained" color="primary" onClick={() => setShowCancellationConfirmationDialog(false)}> No </Button>
                    </div>

                </DialogContent>


            </Dialog>

        </div>



    )
}
