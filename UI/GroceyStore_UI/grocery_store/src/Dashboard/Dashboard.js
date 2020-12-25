import React, { useState, useEffect, Fragment } from "react";
import { Header } from '../Header'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Hidden,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../Healper";
import { useStore } from "../Store";
import {ToolbarMenuItems, toolbarMenuItmes} from '../ToolbarMenuItems'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {MenuPane} from '../MenuPane'


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  DashboardContainer: {
    // paddingTop: "20px",
    // paddingLeft: "50px",
    // paddingRight: "50px",
  },
  root: {
    display: 'flex',
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export const Dashboard = (props) => {

  const classes = useStyles();
  const { history } = props;
  const [category, setCategory] = useState({});
  const images = require.context('../assets/catagory', true);
  const {viewStore} = useStore();

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = () => {

    fetch('https://localhost:44360/Category',
      {
        mode: 'cors'
      })
      .then(result => {
        console.log(result)
        if (result.status === 404) {
          console.log('result is 404')
        } else if (result.status !== 200) {
          console.log('result is not 200')
        } else {
          result.json().then(body => {
            console.log(body, 'response')
            setCategory(body)
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }


  const getGridCard = (id) => {
    const { name } = category[`${id}`];
    const image = images(`./${name}.jpg`);

    return (
      <Grid item xs={6} sm={4} key={id}>
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

  const getListCard = (id) => {
    const { name } = category[`${id}`];
    const image = images(`./${name}.jpg`);

    return (
      <Card onClick={() => history.push( `/${name}` )}>
        <Grid container key={id}>
          <Grid item xs={4} >
            <CardMedia
              className={classes.cardMedia}
              image={image}
              style={{ width: "180px", height: "130px", paddingTop: "90px" }}
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent className={classes.cardContent}>
              <Typography>{`${toFirstCharUppercase(name)}`}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

    );

  }

  const SetView = () => {
    
    if(viewStore.view==="List"){
        return (<div>
        {Object.keys(category).map((catagoryId) => getListCard(catagoryId))}
      </div>)
    }
     else {
      return (<Grid container spacing={2} className={classes.DashboardContainer}>
        {Object.keys(category).map((catagoryId) => getGridCard(catagoryId))}
      </Grid>)
    }
  }

  return (
    <Fragment>
    <Header title="Organic House" history={props.history} />
    <CssBaseline />
    <div className={classes.root}>

     <Hidden smDown>
         <MenuPane history={history}/>
        </Hidden> 
        
      <main className={classes.content}>
      
      <Container maxWidth="lg" className={classes.container}>

      {category ? (
        SetView()
      ) : (
          <CircularProgress />
        )}
       
        </Container>
        </main>

    </div>
    </Fragment>
  );
};
