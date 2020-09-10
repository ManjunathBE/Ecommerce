import React, { useState, useEffect } from "react";
import Header from '../Header'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../Healper";
import mockData from "../mockData";

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
}));

export const Dashboard = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [dashboardData, setDashboardData] = useState(mockData);
  const [category, setCategory] = useState({});
  const images = require.context('../assets/catagory', true);

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = () => {

    fetch('https://grocerystorebackend20200828043724.azurewebsites.net/Category', 
    {
      mode:'cors'})
      .then(result => {
        console.log(result)
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            console.log(body,'response kjkjkjk')
            setCategory(body)

          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }


  const getCard = (catagoryId) => {
    const { categoryId, name } = category[`${catagoryId}`];
    const image = images(`./${name}.jpg`);

    return (
      <Grid item xs={6} sm={4} key={catagoryId}>
        <Card onClick={() => history.push(`/${name}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            style={{ width: "180px", height: "130px", paddingTop: "90px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div>
      <Header title="Organic House" />
      {category ? (
        <Grid container spacing={2} className={classes.DashboardContainer}>
          {Object.keys(category).map((catagoryId) => getCard(catagoryId))}
        </Grid>
      ) : (
          <CircularProgress />
        )}
    </div>
  );
};
