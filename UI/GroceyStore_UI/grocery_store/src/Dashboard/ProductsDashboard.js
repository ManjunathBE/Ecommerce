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
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../Healper";
import { AddProduct } from '../AddProduct'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useStore } from "../Store";
import { MenuPane } from '../MenuPane'
import Box from '@material-ui/core/Box';

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  addProductPopUpDimesnsion: {
    width: "350px",
  },
  alignLeft: {
    textAlign: "left"
  },
  alignRight: {
    
    justifyContent:"flex-end",
    float:'right',
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
  const images = require.context('../assets/products', true);
  const { viewStore } = useStore();

  useEffect(() => {
    fetchProducts()
  }, [])
  const categoryName = (props.location.pathname).substring(1)
  const fetchProducts = () => {

    fetch('https://localhost:44360/Product?category=' + categoryName,)
      .then(result => {
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            console.log(body)
            setProducts(body.slice(0, 4))
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }

  const getGridCard = (id) => {
    const { productName, price, imagePath, unitType } = products[
      `${id}`
    ];
    var unitToDisplay = ""
    if (unitType === 'Kg') {
      unitToDisplay = '1 Kg'
    }

    const image = images(`./${imagePath}.jpg`);
    return (

      <Grid item xs={6} sm={3} key={id}>
        <Card onClick={() => handleProductClick(price, productName, unitType)}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent >
            <Typography className={classes.cardContent}>{`${toFirstCharUppercase(productName)}`}</Typography>
            <div>
                <span>₹{price}</span>
                <span className="positionRight">{unitToDisplay}</span>
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
      { id: 'Quantity', numeric: true, disablePadding: false, label: 'Quantity' },
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
            <TableRow onClick={() => handleProductClick(id.price, id.productName, id.unitType)}>
              <TableCell align="right">{id.productName}</TableCell>
              <TableCell align="right">{id.unitType}</TableCell>
              <TableCell align="right">{id.price}</TableCell>
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

  const handleProductClick = (price, productName, unitType) => {
    setProductPrice(price)
    setproductName(productName)
    setUnitType(unitType)
    setOpenAddProductDialogState(true)
  }

  const handleDialogClose = () => {
    setOpenAddProductDialogState(false)
  }

  const closeModal = () => {
    setOpenAddProductDialogState(false)
  }

  return (
    <div>
      <Header title={(props.location.pathname).substring(1)} history={props.history} />
      <div className={classes.root}>
        <Hidden smDown>
          <MenuPane history={history} />
        </Hidden>

        <main className={classes.content}>

          <Container maxWidth="lg" className={classes.container}>

            {products ? (
              SetView()
            ) : (
                <CircularProgress />
              )}


            <Dialog classes={{ paper: classes.addProductPopUpDimesnsion }} onClose={handleDialogClose} open={openAddProductDialog}>
              <DialogTitle className={classes.root}>
                <IconButton className={classes.closeButton} aria-label="close" onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
                {productName}
              </DialogTitle>
              <DialogContent dividers>
                <AddProduct modelOpen={closeModal} price={productPrice} productName={productName} unitType={unitType} />
              </DialogContent>
            </Dialog>
          </Container>
        </main>
      </div>
    </div>
  );
};
