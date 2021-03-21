import React, { useState, useEffect } from "react"
import { Header } from './Header'
import { useStore } from "./Store";
import {
  Table, TableContainer, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Checkbox, Paper, Toolbar, Typography,
  Tooltip, DialogTitle, DialogContent, Dialog, Card, CardMedia,
  CardContent, Hidden, Container, Grid, TextField
} from '@material-ui/core'
import { lighten, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button"
import FlashMessage from 'react-flash-message'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { AddProduct } from './AddProduct'
import CloseIcon from '@material-ui/icons/Close';
import Footer from './Footer'
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


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  console.log(array, 'in stablesort')
  const stabilizedThis = array.map((el, index) => [el, index]);
  console.log(stabilizedThis, 'in stablesort mapped')
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableHeaders = [
  { id: 'productName', numeric: false, disablePadding: true, label: 'Product' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'unit', numeric: true, disablePadding: false, label: 'Unit' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price (₹)' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, numSelected, cartCount, onRequestSort, orderBy, order } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
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
  cartCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
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
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)
  const [orderBy, setOrderBy] = React.useState('productName');
  const [order, setOrder] = React.useState('asc');
  const [showAddressUpdatedFlash, setShowAddressUpdatedFlash] = useState(false)
  const [showInstructionsDialog, setShowInstructionsDialog] = useState(false)
  const [instructionArray, setInstructionArray]=useState({instructions:[]})

  useEffect(() => {

    if ((Object.keys(cartStore.deliveryAddress).length !== 0)) {
      console.log('inside effect if')
      setShowSelectedAddress(true)
      setSelectedAddressForDelivery(cartStore.deliveryAddress)
    }
  }, [])

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

  const handleRequestSort = (event, property) => {
    console.log('in handle sort request', property)
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
      var orderId = cartStore.cart[0].orderId;
      console.log(cartStore.cart, 'cart')
      console.log(cartStore, 'cartStore')
      cartStore.cart.forEach((item) =>
        cartItemList.push({ Itemid: item.productId, Qty: item.quantity, ItemCost: item.price,instruction:item.instruction })
      )

      console.log(userStore, 'userStore')
      console.log(props.location.state)
      if (props.location.state) {
        if (props.location.state.flag === 'reorder') {
          orderId = -1
        }
      }

      const payload = {
        OrderCost: totalPrice,
        OrderAddressId: selectedAddressForDelivery.AddressId,
        OrderId: orderId,
        OrderItemList: cartItemList,
        instructions: instructionArray
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
    setCartStore({ address, type: 'Address' })

  }

  const handleSuccessDialogClose = () => {

  }

  const handleSelectAddressDialogClose = () => {
    setShowAddressSelection(false)
  }

  const splitAddress = () => {
    console.log(selectedAddressForDelivery, 'selected address for delivery')
    console.log(cartStore.deliveryAddress, 'store address', cartStore.deliveryAddress.length, 'length of address', cartStore, 'cart store')
    // if(cartStore.deliveryAddress)  setSelectedAddressForDelivery(cartStore.deliveryAddress)
    console.log(showSelectedAddress, 'eferferferferferf')
    return (
      <Card>
        <CardContent>
          <Typography>Selected delivery address</Typography><br />
          <Typography><span style={{ fontWeight: 'bold' }}> {selectedAddressForDelivery.AddressNickName}</span><br />
            {selectedAddressForDelivery.FirstAddress}, <br />
            {selectedAddressForDelivery.StreetDetails} <br />
            {selectedAddressForDelivery.City} - {selectedAddressForDelivery.pincode}<br />
          GSTIN NO: {selectedAddressForDelivery.GST} <br />
            <br />{selectedAddressForDelivery.ContactPerson} <br />
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
              //setShowSelectedAddress(true)
            }
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }


  const handleAddressUpdated = () => {
    console.log('in handle 1........')
    setShowSelectedAddress(false)
    setShowAddressUpdatedFlash(true)
    fetchUserDetails()
    setShowAddAddressDialog(false)
    setShowAddressSelection(false)
    setSelectedAddressForDelivery("")

  }

  const handleAddressAdded = () => {
    setShowAddressSelection(false)
  }

  const handleCancelEditing = () => {
    setCartStore({ type: 'DeleteAll' })
  }

  const handleAddress = () => {
    setShowAddressSelection(false)
    setShowAddAddressDialog(true)
  }

  const handleAddAddressDialogClose = () => {
    setShowAddAddressDialog(false)
  }

  const closeModal = () => {
    setShowAddAddressDialog(false)
  }

  const handleInstructionsChange=(event, productName)=>{  
    var instruction = {
      productName:productName,
      instruction: event.target.value
    }
    
setCartStore({instruction, type:"Instruction"})
    // setInstructionArray(...instructionArray.instructions, {productName:event.target.value}) 
    // console.log(instructionArray)
  }
  const handleInstructionsDialogClose=()=>{
    setShowInstructionsDialog(false)
  }
  return (
    <div>
      <div className={classes.root}>
        <main className={classes.content}>
          <Container maxWidth="lg">
            {/* <Header title={(props.location.pathname).substring(1)} history={props.history} />\ */}

            {showAddressUpdatedFlash ?
              <div >
                <FlashMessage duration={5000} >
                  <div className='flashStyling text-center' style={{ color: 'success.main' }}>
                    Address added
                     </div>
                </FlashMessage>
              </div> : ""}

            {itemUpdated ?
              <div >
                <FlashMessage duration={5000} >
                  <div className='flashStyling text-center' style={{ color: 'success.main' }}>
                    Item Updated
                        </div>
                </FlashMessage>
              </div> : ""}

            {isOrderPlaced ? <FlashMessage duration={5000}>
              <div className='flashStyling'>
                Order placed
        </div>
            </FlashMessage> : ""}


            <EnhancedTableToolbar numSelected={selected.length} selectedItems={selected} />

            <Grid container spacing={2}>

              <Grid item xs={12} md={7} className={classes.margins}>
                <Card>
                  <CardContent style={{ padding: '0px' }}>


                    <TableContainer >
                      {emptyRows.length ?
                        <React.Fragment>
                          <Table>
                            <EnhancedTableHead
                              classes={classes}
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              cartCount={cartStore.cart.length}
                            />
                            <TableBody>

                              {stableSort(cartStore.cart, getComparator(order, orderBy))
                                .map((cart, index) => {



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



                          {cartStore.cart[0].orderId ? <Button className={classes.btnnMargins} variant='contained' color='primary' onClick={handleCancelEditing}>Cancel Editing</Button> : ""}

                          <Hidden mdUp>
                            <Button className={classes.btnnMargins} variant='contained' color='primary' onClick={() => history.push("/")}>Continue Shopping</Button>
                            <Button className={classes.btnnMargins} variant='contained' color='primary' onClick={() => setShowInstructionsDialog(true)}>Add Instructions</Button>
                            <br />
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
                      <Button className={classes.btnnMargins} variant='contained' color='primary' onClick={() => history.push("/")}>Continue Shopping</Button>
                      <Button className={classes.btnnMargins} variant='contained' color='primary' onClick={() => setShowInstructionsDialog(true)}>Add Instructions</Button>
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
          {<FlashMessage></FlashMessage>}
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleSelectAddressDialogClose}>
            <CloseIcon />
          </IconButton>

        </DialogTitle>
        <DialogContent>
          <Button onClick={handleAddress} variant="contained" color="primary">Add Address</Button>

          <Typography> or <br /> Select saved address</Typography>

          {addressStore.address.length ?

            (addressStore.address.map((address) =>
              <Card style={{ marginTop: '16px' }} onClick={() => handleAddressCardClick(address)} spacing={2}>
                <CardContent>
                  <Typography><span style={{ fontWeight: 'bold' }}> {address.AddressNickName}</span><br />
                    {address.FirstAddress}, <br />
                    {address.StreetDetails}, <br />
                    {address.City} - {address.pincode}<br />
                    GSTIN NO: {address.GST} <br />
                    <br />{address.ContactPerson} <br />
                  Phone: {address.Phone[0]}</Typography>
                </CardContent>
              </Card>)
            ) :
            <div>
              <Typography>We could not find any address in your profile. please add one</Typography>
              <EditAddress modelOpen={handleAddressAdded} AddressUpdated={handleAddressUpdated} gst={""} />

            </div>}
        </DialogContent>
      </Dialog>


      <Dialog open={showAddAddressDialog}>
        <DialogTitle>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleAddAddressDialogClose}>
            <CloseIcon />
          </IconButton>
                Add Address

        </DialogTitle>
        <DialogContent>
          <EditAddress modelOpen={closeModal} AddressUpdated={handleAddressUpdated} gst={""}
          />
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
            addToCart={FlashItemUpdated} unitTypeId={productToEdit.unitTypeId}
            productId={productToEdit.productId} />
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

<Dialog open={showInstructionsDialog}>
  <DialogTitle>
  <IconButton className={classes.closeButton} aria-label="close" onClick={handleInstructionsDialogClose}>
            <CloseIcon />
          </IconButton>

  </DialogTitle>
  <DialogContent>
    <TableContainer>

    </TableContainer>
    <TableHead>
      <TableRow>
        <TableCell>
          Product
        </TableCell>
        <TableCell>
          Instructions
        </TableCell>
      </TableRow>
    </TableHead>
<TableBody>
 
{cartStore.cart.map((item)=>{
   console.log(instructionArray, 'instructionArray')
  return(
    <TableRow>
      <TableCell>
        {item.productName}
      </TableCell>
      <TableCell>
        <TextField onChange={(event)=>handleInstructionsChange(event,item.productName)}
        defaultValue={item.instruction}>

        </TextField>
      </TableCell>
    </TableRow>
  )
}
)}
<Button variant="contained" color="primary" onClick={handleInstructionsDialogClose}>Save</Button>
</TableBody>
  </DialogContent>
</Dialog>


    </div>
  )

}
