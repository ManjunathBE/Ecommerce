import React, { useState, useEffect } from "react";
import Header from '../Header'
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
import mockData from "../mockData";
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
  const [dashboardData, setDashboardData] = useState(mockData);
  const images = require.context('../assets/catagory', true);

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    fetch('https://grocerystorebackend20200828043724.azurewebsites.net/product',)
      .then(result => {
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            console.log(body)
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }

  const getCard = (catagoryId) => {
    const { name } = dashboardData[
      `${catagoryId}`
    ];
    const image = images(`./${name}.jpg`);

    return (

      <Grid item xs={6} sm={4} key={catagoryId}>
        <Card onClick={() => setOpenAddProductDialogState(true)}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>

    );
  };

  const handleDialogClose = () => {
    setOpenAddProductDialogState(false)
    console.log('in close')
  }

  return (
    <div>
      <Header title={(props.location.pathname).substring(1)} />

      {dashboardData ? (
        <Grid container spacing={2} className={classes.DashboardContainer}>
          {Object.keys(dashboardData).map((catagoryId) => getCard(catagoryId))}
        </Grid>
      ) : (
          <CircularProgress />
        )}
      <Dialog onClose={handleDialogClose} open={openAddProductDialog}>
        <DialogTitle className={classes.root}>
        <IconButton  className={classes.closeButton} aria-label="close" onClick={handleDialogClose}>
          <CloseIcon />
        </IconButton>
        Veggies
        </DialogTitle>
        <DialogContent dividers>
        <AddProduct open={openAddProductDialog} />
        </DialogContent>
      </Dialog>

    </div>
  );
};
