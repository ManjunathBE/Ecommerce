import React, { useState } from "react";
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
  const images = require.context('../assets/catagory', true);

  const getCard = (catagoryId) => {
    const { id, name } = dashboardData[`${catagoryId}`];
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
      <Header title="Organic House"/>
      {dashboardData ? (
        <Grid container spacing={2} className={classes.DashboardContainer}>
          {Object.keys(dashboardData).map((catagoryId) => getCard(catagoryId))}
        </Grid>
      ) : (
          <CircularProgress />
        )}
    </div>
  );
};
