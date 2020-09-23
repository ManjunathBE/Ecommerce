import React, { useState, useEffect } from "react";
import {Header} from '../Header'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../Healper";
import { AddProduct } from '../AddProduct'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  DashboardContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
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
    margin: 0,
    padding: theme.spacing(2),
  },
}));

export const ProductsDashboard = (props) => {

  const [openAddProductDialog, setOpenAddProductDialogState] = useState(false)
  const classes = useStyles();
  const { history } = props;
  const [products, setProducts] = useState("");
  const [productPrice, setProductPrice] = useState(0)
  const [productName, setproductName] = useState("")
  const images = require.context('../assets/products', true);

  useEffect(() => {
    fetchProducts()
  }, [])
  const categoryName = (props.location.pathname).substring(1)
  const fetchProducts = () => {
    
    fetch('https://eorganicshop.herokuapp.com/Product?category='+categoryName,)
      .then(result => {
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            console.log(body)
            setProducts(body.slice(0,3))
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }

  const getCard = (id) => {
    console.log(id,'kkkkk')
    const { productName, price, imagePath } = products[
      `${id}`
    ];
    const img =toFirstCharUppercase(imagePath)
    const image = images(`./${imagePath}.jpg`);
    // setPrice(price)

    return (

      <Grid item xs={6} sm={4} key={id}>
        <Card onClick={()=>handleProductClick(price, productName)}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${toFirstCharUppercase(productName)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>

    );
  };

  const handleProductClick=(price, productName) =>{
    setProductPrice(price)
    setproductName(productName)
    setOpenAddProductDialogState(true)
  }

  const handleDialogClose = () => {
    setOpenAddProductDialogState(false)
    console.log('in close')
  }

  const closeModal=()=>{
    setOpenAddProductDialogState(false)
  }

  return (
    <div>
      <Header title={(props.location.pathname).substring(1)} history={props.history} />

      {products ? (
        <Grid container spacing={2} className={classes.DashboardContainer}>
          {Object.keys(products).map((id) => getCard(id))}
        </Grid>
      ) : (
          <CircularProgress />
        )}
      <Dialog onClose={handleDialogClose} open={openAddProductDialog}>
        <DialogTitle className={classes.root}>
        <IconButton  className={classes.closeButton} aria-label="close" onClick={handleDialogClose}>
          <CloseIcon />
        </IconButton>
        {productName}
        </DialogTitle>
        <DialogContent dividers>
        <AddProduct modelOpen={closeModal} price={productPrice} productName={productName} />
        </DialogContent>
      </Dialog>

    </div>
  );
};
