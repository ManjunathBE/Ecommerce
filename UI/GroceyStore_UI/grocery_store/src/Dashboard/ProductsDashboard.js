import React, { useState, useEffect } from "react";
import { Header } from '../Header'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  DialogTitle,
  DialogContent,
  Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Hidden,
  Container, Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase, unitMapper } from "../Helper";
import { AddProduct } from '../AddProduct'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useStore } from "../Store";
import { MenuPane } from '../MenuPane'
import Box from '@material-ui/core/Box';
import FlashMessage from 'react-flash-message'
import Loader from "react-loader-spinner";
import { Spinner } from '../Spinner'
import Footer from '../Footer'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  DashboardContainer: {
    // paddingTop: "20px",
    // paddingLeft: "50px",
    // paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  root: {
    display: 'flex',
    margin: 0,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: { 
      padding: '0px'
    },
  },
  addProductPopUpDimesnsion: {
    width: "350px",
  },
  alignLeft: {
    textAlign: "left"
  },
  alignRight: {
    justifyContent: "flex-end",
    float: 'right',
  },
  backBtn:{
    paddingTop:theme.spacing(1),
    paddingBottom:theme.spacing(1)
  },
  cardShadow:{
    '&:hover':{
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    },
    cursor:'pointer'
  }
}));

export const ProductsDashboard = (props) => {

  const [openAddProductDialog, setOpenAddProductDialogState] = useState(false)
  const classes = useStyles();
  const { history } = props;
  const [products, setProducts] = useState("");
  const [productPrice, setProductPrice] = useState(0)
  const [productName, setproductName] = useState("")
  const [unitType, setUnitType] = useState("")
  const { viewStore } = useStore();
  const [addedToCart, setAddedToCart] = useState(false)
  const [productId, setProductId] = useState()
  const [showSpinner, setShowSpinner] = useState(true)
  const [showFallback, setShowFallback] = useState(false)
  const [zeroQuantityFlashWarning, setZeroQuantityFlashWarning] = useState(false)
  const [unitTypeId, setUnitTypeId] = useState()

  useEffect(() => {
    fetchProducts()
  }, [])

  const categoryId = (props.location.pathname).substring(1)
  console.log('product id from pros', categoryId)

  const fetchProducts = () => {
    const payload = {
      "branch_id": "1",
      "categoryid": categoryId
    }

    fetch('https://testapi.slrorganicfarms.com/category/getallItemsByCateId',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': window.localStorage.token
        },
        body: JSON.stringify(payload)
      }
    )
      .then(result => {
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            if (body.success !== true) {
              console.log('request failed', body)
              setShowFallback(true)
              setShowSpinner(false)

            } else {
              console.log(body)
              setShowSpinner(false)
              setProducts(body.data)
            }
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }

  const getDiscountPrecentage = (MRP_Price, SellIngPrice) => {
    if (SellIngPrice !== null) {
      var discount = MRP_Price - SellIngPrice
      return discount * (100 / MRP_Price).toFixed(0)
    }
  }

  const getGridCard = (id) => {
    const { Id, ItemName, ItemImage, UnitName, MRP_Price, SellIngPrice, UnitTypeId } = products[
      `${id}`
    ];
    var isDiscount = false;
    var unitToDisplay = ""

    var discountPercentage;
    var price;


    if (SellIngPrice !== null) {
      var discount = MRP_Price - SellIngPrice
      discountPercentage = discount * (100 / MRP_Price).toFixed(0)
      if (discountPercentage !== 0) {
        isDiscount = true
        price = SellIngPrice
      }
      else {
        price = MRP_Price
      }
    }
    return (

      <Grid item xs={6} sm={3} key={id}>
        <Card className={classes.cardShadow} onClick={() => handleProductClick(SellIngPrice, ItemName, UnitName, Id, UnitTypeId)}>
          {isDiscount ?
            <div>
              {discountPercentage}
            </div> : ""}
          <CardMedia
            className={classes.cardMedia}
            image={ItemImage}
             style={{ width: "100%", height: "200px" }}
            //style={{ width: "130px", height: "130px" }}
          />
          <CardContent >
            <Typography className={classes.cardContent}>{`${toFirstCharUppercase(ItemName)}`}</Typography>
            <div className="text-center">
              ₹{SellIngPrice} / {UnitName}
            </div>
          </CardContent>
        </Card>
      </Grid>

    );
  };

  const getListCard = () => {
    const TableHeaders = [
      { id: 'Product', numeric: false, disablePadding: true, label: 'Product Name' },
      { id: 'Units', numeric: true, disablePadding: false, label: 'Units' },
      { id: 'Price', numeric: true, disablePadding: false, label: 'Price' },
    ];

    console.log(products, 'proooddducts')
    return (
      <Table>
        <TableHead>
          <TableRow>
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
        <TableBody>

          {(products).map((id) =>
            <TableRow onClick={() => handleProductClick(id.SellIngPrice, id.ItemName, id.UnitName, id.Id, id.UnitTypeId)}>
              <TableCell align="right">{id.ItemName}</TableCell>
              <TableCell align="right">{id.UnitName}</TableCell>
              <TableCell align="right">{id.SellIngPrice}</TableCell>
            </TableRow>
          )}


        </TableBody>

      </Table>
      // <Card onClick={() => handleProductClick(price, productName, unitType)}>
      //   <Grid container key={id}>

      //     <Grid item xs={8}>
      //       <CardContent className={classes.cardContent}>
      //         <Typography>{`${toFirstCharUppercase(productName)}`}</Typography>
      //       </CardContent>
      //     </Grid>
      //   </Grid>
      // </Card>

    );

  }

  const SetView = () => {
    console.log(viewStore, 'fdfdfd')
    if (viewStore.view === "List") {
      console.log('in if')
      return (
        getListCard()
      )
    }
    else {
      return (<Grid container spacing={2} className={classes.DashboardContainer}>
        {Object.keys(products).map((id) => getGridCard(id))}
      </Grid>)
    }
  }

  const handleProductClick = (price, productName, UnitName, productId, UnitTypeId) => {
    setProductId(productId)
    setProductPrice(price)
    setproductName(productName)
    setUnitType(UnitName)
    setUnitTypeId(UnitTypeId)
    setOpenAddProductDialogState(true)
    setAddedToCart(false)
  }

  const handleDialogClose = () => {
    setOpenAddProductDialogState(false)
  }

  const closeModal = () => {
    setOpenAddProductDialogState(false)
  }

  const FlashAddedToCart = () => {
    setAddedToCart(true)
  }

  const FlashZeroQuantity = () => {
    setZeroQuantityFlashWarning(true)
  }

  return (
    <div>
      {zeroQuantityFlashWarning ?
        <FlashMessage duration={5000} >
          <div className='flashStyling text-center'>
            Quantity should be greater than zero
                      </div>
        </FlashMessage> : ""}
      <div className={classes.root}>
        <main className={classes.content}>

          <Container maxWidth="lg" className={classes.container}>
            {/* <Header title={(props.location.pathname).substring(1)} history={props.history} /> */}
            {addedToCart ?
              <div >
                <FlashMessage duration={5000} >
                  <div className='flashStyling text-center'>
                    Added to Cart
                        </div>
                </FlashMessage>
              </div> : ""}



            {/* <Hidden smDown>
          <MenuPane history={history} />
        </Hidden> */}

<div className={classes.backBtn}>
            <Button  variant="contained" color="primary" onClick={() => history.push('/')}>
              <span><KeyboardBackspaceIcon/></span>  Back to categories</Button>
            </div>

            {showFallback ? <Typography>Items coming soon ... !</Typography> : ""}

            {products ? (
              SetView()
            ) : ""}


            <Dialog classes={{ paper: classes.addProductPopUpDimesnsion }} onClose={handleDialogClose} open={openAddProductDialog}>
              <DialogTitle className={classes.root}>
                <IconButton className={classes.closeButton} aria-label="close" onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
                {productName}
              </DialogTitle>
              <DialogContent dividers>
                <AddProduct modelOpen={closeModal} price={productPrice} productName={productName} unitTypeId={unitTypeId}
                  unitType={unitType} addToCart={FlashAddedToCart} productId={productId} zeroQuantityFlash={FlashZeroQuantity} />
              </DialogContent>
            </Dialog>
          </Container>
        </main>

        <Hidden mdUp >
          <Footer history={history} />
        </Hidden>

        <Spinner showSpinner={showSpinner} />
      </div>
    </div>
  );
};
