import React, { useState } from "react"
import { Header } from './Header'
import { useStore } from "./Store";
import {
  Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Checkbox, Paper, Toolbar, Typography,
  Tooltip, DialogTitle, DialogContent, Dialog, Card, CardMedia,
  CardContent, Hidden, Container, Grid
} from '@material-ui/core'
import { lighten, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button"
import SuccessPage from './Success'
import { Redirect } from "react-router-dom";
import FlashMessage from 'react-flash-message'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { AddProduct } from './AddProduct'
import CloseIcon from '@material-ui/icons/Close';
import { MenuPane } from './MenuPane'
import Footer from './Footer'
import EmptyCartImage from './Images/empty-cart.png'
import { EditAddress } from "./UserProfile/EditAddress";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {

    paddingBottom: theme.spacing(4),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  addProductPopUpDimesnsion: {
    width: "350px",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  border: {
    border: '0.5px solid grey'
  },
  margins: {
    // [theme.breakpoints.up('md')]: {
    //   marginLeft: theme.spacing(2),
    //   marginRight: theme.spacing(2)
    // },

  },
  btnnMargins: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const TableHeaders = [
  { id: 'Product', numeric: false, disablePadding: true, label: 'Product' },
  { id: 'Quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'Untis', numeric: true, disablePadding: false, label: 'Units' },
  { id: 'Price', numeric: true, disablePadding: false, label: 'Price (₹)' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, numSelected, cartCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < cartCount}
            checked={cartCount > 0 && numSelected === cartCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {TableHeaders.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

}));


export const Cart = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const { cartStore, setCartStore, userStore } = useStore();
  const [disablePlaceOrderButton, setDisablePlaceOrderButton] = useState(true)
  const { history } = props;
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const [editCart, setEditCart] = useState(false)
  const [productToEdit, setProductToEdit] = useState([]);
  const [showAddressSelection, setShowAddressSelection] = useState(false)
  const [showSelectedAddress, setShowSelectedAddress] = useState(false)
  const [selectedAddressForDelivery, setSelectedAddressForDelivery] = useState()
  const [selectedAddressId, setSelectedAddressId] = useState()
  const { addressStore, setAddressStore, setUserStore, setTokenStore } = useStore()
  const [itemUpdated, setItemUpdated] = useState(false)

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    const handleDelete = () => {
      selected.forEach((item) => setCartStore({ item, type: 'Delete' }))
      setSelected([])
    }

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : ""}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </Tooltip>
        ) : ""}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleSelectAllClick = (event) => {
    debugger
    if (event.target.checked) {
      const newSelecteds = cartStore.cart.map((n) => n.productName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleEditClick = (event, cart) => {
    console.log(cart, 'cart in edit')
    setEditCart(true)
    console.log(event, 'event in edit')
    setProductToEdit(cart);
  }

  const handlePlaceOrder = () => {


    if (!showSelectedAddress) {
      alert('please select a delivery address')
    }

    else {
      var cartItemList = []
      console.log(cartStore.cart, 'cart')
      console.log(cartStore, 'cartStore')
      cartStore.cart.forEach((item) =>
        cartItemList.push({ Itemid: item.productId, Qty: item.quantity, ItemCost: item.price })
      )

      console.log(userStore, 'userStore')
      const payload = {
        OrderCost: totalPrice,
        OrderAddressId: selectedAddressForDelivery.AddressId,
        OrderItemList: cartItemList
      }
      console.log(payload, 'ordered products')
      fetch('https://testapi.slrorganicfarms.com/cart/CheckoutOrderByCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': window.localStorage.token
        },
        body: JSON.stringify(payload)
      })
        .then(result => {
          if (result.status === 200)
            result.json().then(body => {
              if (body.success === true) {
                console.log(body, 'result from backend')
                setIsOrderPlaced(true)
                setCartStore({ type: 'DeleteAll' })
              }
              else {
                //TODO: handle some error occured
              }
            })
        })
    }
  }

  const handleEditOrderDialogClose = () => {
    setEditCart(false)

  }

  const handleSelectAddress = () => {

    setShowAddressSelection(true)
  }

  const handleAddressCardClick = (address) => {
    setShowAddressSelection(false)
    setShowSelectedAddress(true)
    setSelectedAddressForDelivery(address)

  }

  const handleSuccessDialogClose = () => {

  }

  const handleSelectAddressDialogClose = () => {
    setShowAddressSelection(false)
  }

  const splitAddress = () => {
    console.log(selectedAddressForDelivery, 'selected address for delivery')
    return (<Card>
      <CardContent>
        <Typography>Selected delivery address</Typography><br />
        <Typography>{selectedAddressForDelivery.AddressNickName}<br />
          {selectedAddressForDelivery.FirstAddress}, {selectedAddressForDelivery.StreetDetails} <br />
          {selectedAddressForDelivery.City} <br />
          Pin: {selectedAddressForDelivery.pincode}<br />
                  Phone: {selectedAddressForDelivery.Phone[0]}
        </Typography>
      </CardContent>
    </Card>)
  }

  const FlashItemUpdated = () => {
    setItemUpdated(true)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = cartStore.cart
  console.log(emptyRows, 'empt')
  var totalPrice = 0
  console.log(addressStore.address.length, 'address length')

  const fetchUserDetails = (UpdateType) => {
    const payload = {
      "mobilenumber": window.localStorage.phone,
      "logintype": "social",
      "device_token": ""
    }
    console.log(payload, 'payload')

    fetch('https://testapi.slrorganicfarms.com/auth/login',
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(result => {
        console.log(result, 'fetch in login')
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log(result)
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            if (body.success !== true) {
              console.log('request failed', body)
            }
            else {
              console.log(body, 'response')
              var user = body.data[0]
              var address = body.address
              console.log('address from backend', address)

              window.localStorage.setItem('token', body.token)
              window.localStorage.setItem('phone', user.Phone)

              setAddressStore({ address, type: 'Address' })
              setUserStore({ user, type: 'User' })
              setSelectedAddressForDelivery(address[0])
              setTokenStore({ token: user.token })
              setShowSelectedAddress(true)
            }
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }


  const handleAddressUpdated = () => {
    fetchUserDetails()
    setShowAddressSelection(false)

  }

  const handleAddressAdded = () => {
    setShowAddressSelection(false)
  }

  return (
    <div>
      <div className={classes.root}>
        <main className={classes.content}>
          <Container maxWidth="lg">
            {/* <Header title={(props.location.pathname).substring(1)} history={props.history} />\ */}

            {itemUpdated ?
              <div >
                <FlashMessage duration={5000} >
                  <div className='flashStyling text-center'>
                    Item Updated
                        </div>
                </FlashMessage>
              </div> : ""}

            {isOrderPlaced ? <FlashMessage duration={5000}>
              <div className='flashStyling'>
                Order placed
        </div>
            </FlashMessage> : ""}


            {/* <Hidden smDown>
          <MenuPane history={history} />
        </Hidden> */}



            <EnhancedTableToolbar numSelected={selected.length} selectedItems={selected} />

            <Grid container spacing={2}>

              <Grid item xs={12} md={7} className={classes.margins}>
                <Card>
                  <CardContent style={{ padding: '0px' }}>


                    <TableContainer >
                      {emptyRows.length ? <React.Fragment><Table>
                        <EnhancedTableHead
                          classes={classes}
                          numSelected={selected.length}
                          onSelectAllClick={handleSelectAllClick}
                          cartCount={cartStore.cart.length}
                        />
                        <TableBody>
                          {cartStore.cart.map((cart, index) => {
                            console.log(cart, 'item in cart')


                            const isItemSelected = isSelected(cart.productName);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            totalPrice = totalPrice + cart.price
                            return (
                              <TableRow
                                hover

                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={cart.productName}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={(event) => handleClick(event, cart.productName)}
                                  />
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                  {cart.productName}
                                </TableCell>
                                <TableCell align="right">{cart.quantity}
                                  <EditTwoToneIcon onClick={(event) => handleEditClick(event, cart)} />
                                </TableCell>
                                <TableCell align="right">{cart.unit}</TableCell>
                                <TableCell align="right">{(cart.price).toFixed(2)}</TableCell>
                              </TableRow>
                            );
                          })}
                          <Hidden mdUp>
                            <TableRow>
                              <TableCell colspan={5} align="right">total price: ₹ {(totalPrice.toFixed(2))} <br />
                              total items :{cartStore.cart.length}</TableCell>

                            </TableRow>
                          </Hidden>
                        </TableBody>
                      </Table>

                        {showSelectedAddress ? splitAddress() : ""}

                        <Button className={classes.btnnMargins} variant='contained' color='primary' onClick={() => history.push("/")}>Continue Shopping</Button>

                        <Hidden mdUp>
                          <Button disabled={cartStore.cart.length === 0} className={classes.btnnMargins} variant='contained' color='primary' onClick={handleSelectAddress}>Add/Select Address</Button>
                          <Button disabled={cartStore.cart.length === 0} className={classes.btnnMargins} variant='contained' color='primary' onClick={handlePlaceOrder}>Place Order</Button>
                        </Hidden>

                      </React.Fragment> : "Cart is empty"}
                    </TableContainer>
                  </CardContent>
                </Card>



              </Grid>
              <Grid item xs={false} md={4} className={classes.margins}>
                <Hidden smDown>
                  <Card>
                    <CardContent>
                      <Typography style={{ fontSize: '32px' }}>Total : ₹ {(totalPrice).toFixed(2)}</Typography> <br />
                      <Button disabled={cartStore.cart.length === 0} className={classes.btnnMargins} variant='contained' color='primary' onClick={handleSelectAddress}>Add/Select Address</Button> <br />
                      <Button disabled={cartStore.cart.length === 0} className={classes.btnnMargins} variant='contained' color='primary' onClick={handlePlaceOrder}>Place Order</Button>
                    </CardContent>
                  </Card>
                </Hidden>
              </Grid>
            </Grid>
          </Container>
        </main>
        <Hidden mdUp >
          <Footer history={history} />
        </Hidden>
      </div>


      <Dialog open={showAddressSelection} onClose={handleSelectAddressDialogClose}>
        <DialogTitle>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleSelectAddressDialogClose}>
            <CloseIcon />
          </IconButton>
          <Typography>Select Delivery address</Typography>
        </DialogTitle>
        <DialogContent>

          {addressStore.address.length ?

            (addressStore.address.map((address) =>
              <Card style={{ marginTop: '16px' }} onClick={() => handleAddressCardClick(address)} spacing={2}>
                <CardContent>
                  <Typography>{address.AddressNickName}<br />
                    {address.FirstAddress}, {address.StreetDetails} <br/>
                    {address.City}<br/>
                    Pin: {address.pincode}<br />
                  Phone: {address.Phone[0]}</Typography>
                </CardContent>
              </Card>)
            ) :
            <div>
              <Typography>We could not find any address in your profile. please add one</Typography>
              <EditAddress modelOpen={handleAddressAdded} AddressUpdated={handleAddressUpdated} />

            </div>}
        </DialogContent>
      </Dialog>


      <Dialog classes={{ paper: classes.addProductPopUpDimesnsion }} onClose={handleEditOrderDialogClose} open={editCart}>
        <DialogTitle className={classes.root}>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleEditOrderDialogClose}>
            <CloseIcon />
          </IconButton>
          {productToEdit.productName}
        </DialogTitle>
        <DialogContent dividers>
          <AddProduct modelOpen={handleEditOrderDialogClose} price={productToEdit.itemPrice}
            productName={productToEdit.productName}
            unitType={productToEdit.unit}
            quantityToEdit={productToEdit.quantity}
            addToCart={FlashItemUpdated} unitTypeId={productToEdit.unitTypeId} />
        </DialogContent>
      </Dialog>


      <Dialog classes={{ paper: classes.addProductPopUpDimesnsion }} onClose={handleSuccessDialogClose} open={isOrderPlaced}>
        <DialogTitle className={classes.root}>
          <Typography>Order has been placed successfuly</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Order would be delivered tomorrow. </Typography>
          <Button color='primary' variant='contained' onClick={() => history.push('/')}>Ok</Button>
        </DialogContent>
      </Dialog>



    </div>
  )
}
