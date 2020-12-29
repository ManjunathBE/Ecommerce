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
    paddingTop: theme.spacing(4),
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
}));

const TableHeaders = [
  { id: 'Product', numeric: false, disablePadding: true, label: 'Product' },
  { id: 'Quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'Untis', numeric: true, disablePadding: false, label: 'Units' },
  { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },
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
  const [showSelectedAddress, setShowhowSelectedAddress] = useState(false)
  const [selectedAddressForDelivery, setSelectedAddressForDelivery] = useState()
  const [selectedAddressId, setSelectedAddressId] = useState()

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

    console.log(userStore, 'userStore')
    const payload = {
      UserId: userStore.user.userId,
      AddressId: selectedAddressForDelivery.id,
      Status: 'Executed',
      orderedProducts: cartStore.cart
    }
    console.log(payload, 'ordered products')
    fetch('https://localhost:44360/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(result => {
        if (result.status === 201) {
          console.log(result, 'result from backend')
          var orderId = result.transactionId;
          console.log(orderId, 'orderid')
          setIsOrderPlaced(true)
        }
      })

  }

  const handleEditOrderDialogClose = () => {
    setEditCart(false)

  }

  const handleSelectAddress = () => {

    setShowAddressSelection(true)
  }

  const handleAddressCardClick = (address) => {
    setShowAddressSelection(false)
    setShowhowSelectedAddress(true)
    setSelectedAddressForDelivery(address)

  }

  const splitAddress = () => {
    //setSelectedAddressId(selectedAddressForDelivery.id)
    return (<Typography>{selectedAddressForDelivery.addressLine1}
      {selectedAddressForDelivery.addressLine2}
      {selectedAddressForDelivery.city}
      {selectedAddressForDelivery.pinCode}</Typography>)
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = cartStore.cart
  console.log(emptyRows, 'empt')
  var totalPrice = 0

  return (
    <div>
      <Header title={(props.location.pathname).substring(1)} history={props.history} />
      <div className={classes.root}>
        <Hidden smDown>
          <MenuPane history={history} />
        </Hidden>

        <main className={classes.content}>

          <Container maxWidth="lg" className={classes.container}>

            <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} selectedItems={selected} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>               
                  <TableContainer>
                    {emptyRows.length ? <React.Fragment><Table>
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        cartCount={cartStore.cart.length}
                      />
                      <TableBody>
                        {cartStore.cart.map((cart, index) => {

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
                                <EditTwoToneIcon onClick={(event) => handleEditClick(event, cart)} />
                              </TableCell>
                              <TableCell align="right">{cart.quantity}</TableCell>
                              <TableCell align="right">{cart.unit}</TableCell>
                              <TableCell align="right">{cart.price}</TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow>
                          <TableCell colspan={5} align="right">total price:  {totalPrice} <br />
                              total items :{cartStore.cart.length}</TableCell>

                        </TableRow>
                      </TableBody>
                    </Table>

                      {showSelectedAddress ? splitAddress() : ""}
                      <Button onClick={handleSelectAddress}>Add/Select Address</Button>

                      <Button onClick={() => history.push("/")}>Continue Shopping</Button>
                      <Button onClick={handlePlaceOrder}>Place Order</Button>
                    </React.Fragment> : "Cart is empty"}
                  </TableContainer>



                </Grid>
                <Grid item xs={false} md={5}>
<Card>
<CardContent>
  Total : {totalPrice}
</CardContent>
</Card>
                </Grid>

              </Grid>

            </Paper>
          </Container>
        </main>
      </div>


      <Dialog open={showAddressSelection}>
        <DialogTitle>

        </DialogTitle>
        <DialogContent>

          {userStore.user.address.map((address) =>
            <Card onClick={() => handleAddressCardClick(address)}>
              <CardContent>
                <Typography>{address.addressLine1}
                  {address.addressLine2}
                  {address.city}
                  {address.pinCode}</Typography>
              </CardContent>

            </Card>
          )}



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
          <AddProduct modelOpen={handleEditOrderDialogClose} price={productToEdit.price}
            productName={productToEdit.productName}
            unitType={productToEdit.unit}
            quantityToEdit={productToEdit.quantity} />
        </DialogContent>
      </Dialog>


      {isOrderPlaced ? <div className='flashStyling'><FlashMessage duration={5000}>
        Order placed
  </FlashMessage> </div> : ""}
    </div>
  )
}
