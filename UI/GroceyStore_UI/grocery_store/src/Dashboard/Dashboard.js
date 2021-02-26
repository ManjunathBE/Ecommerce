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
  Dialog, DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../Helper";
import { useStore } from "../Store";
import { ToolbarMenuItems, toolbarMenuItmes } from '../ToolbarMenuItems'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MenuPane } from '../MenuPane'
import { Spinner } from '../Spinner'
import Footer from '../Footer'
import {CarouselElement} from '../CarouselElement'


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  DashboardContainer: {
    // paddingTop: "20px",
    // paddingLeft: "50px",
    // paddingRight: "50px",
  },
  root: {
    display: 'flex',
    // flexDirection: 'column',
    // minHeight: '100vh',
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
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export const Dashboard = (props) => {

  const classes = useStyles();
  const { history } = props;
  const [category, setCategory] = useState({});
  const images = require.context('../assets/catagory', true);
  const { viewStore } = useStore();
  const { tokenStore } = useStore();
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    fetchCategory()
  }, [])

  const fetchCategory = () => {
    console.log('token from store', tokenStore)
    console.log(window.localStorage, 'local storage')
    var token = window.localStorage.token

    console.log(props, 'props in dashboard')
    // var token = props.location.state.token
    // console.log(token,'token in dashboard')

    const payload = {
      "branch_id": "1"
    }

    fetch('https://testapi.slrorganicfarms.com/category/getCategoryByBranchid',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(payload)
      })
      .then(result => {
        console.log(result)
        if (result.status === 404) {
          console.log('result is 404')
          setShowSpinner(false)
        } else if (result.status !== 200) {
          console.log('result is not 200')
          setShowSpinner(false)
        } else {
          result.json().then(body => {
            if (body.success !== true) {
              console.log('request failed', body)
              setShowSpinner(false)
            } else {
              console.log(body, 'response')
              setCategory(body.data)
              setShowSpinner(false)
            }
          });
        }
      })
      .catch(error => {
        console.log("error from server", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      });
  }


  const getGridCard = (id) => {
    console.log(category, 'category obj')
    const { Id, CategoryName, CategoryPic } = category[`${id}`];
    //const image = images(`./${name}.jpg`);

    return (
      <Grid item xs={6} sm={3} key={id}>
        <Card onClick={() => history.push(`/${Id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={CategoryPic}
            style={{ width: "180px", height: "130px", paddingTop: "90px" }}
          />
          <CardContent className={classes.cardContent}>
            {CategoryName?
            <Typography>{`${toFirstCharUppercase(CategoryName)}`}</Typography>:""}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  // const getListCard = (id) => {
  //   const { name } = category[`${id}`];
  //   const image = images(`./${name}.jpg`);

  //   return (
  //     <Card onClick={() => history.push(`/${name}`)}>
  //       <Grid container key={id}>
  //         <Grid item xs={4} >
  //           <CardMedia
  //             className={classes.cardMedia}
  //             image={image}
  //             style={{ width: "180px", height: "130px", paddingTop: "90px" }}
  //           />
  //         </Grid>
  //         <Grid item xs={8}>
  //           <CardContent className={classes.cardContent}>
  //             <Typography>{`${toFirstCharUppercase(name)}`}</Typography>
  //           </CardContent>
  //         </Grid>
  //       </Grid>
  //     </Card>

  //   );

  // }

  const SetView = () => {

    // if (viewStore.view === "List") {
    //   return (<div>
    //     {/* {Object.keys(category).map((catagoryId) => getListCard(catagoryId))} */}
    //   </div>)
    // }
    // else {
    return (<Grid container spacing={2} className={classes.DashboardContainer}>
      {Object.keys(category).map((Id) => getGridCard(Id))}
    </Grid>)
    // }
  }

  return (
    <Fragment>
       <div className={classes.root}>
       <main className={classes.content}>

<Container maxWidth="lg" className={classes.container}>
      {/* <Header title="Organic House" history={props.history} /> */}
      <CarouselElement/>
      <CssBaseline />
     

        {/* <Hidden smDown>
          <MenuPane history={history} />
        </Hidden> */}

      

            {category ? (
              SetView()
            ) : (
                <CircularProgress />
              )}

          

          </Container>
        </main>
        <Hidden mdUp >
              <Footer history={history}/>
            </Hidden>

        <Spinner showSpinner={showSpinner} />

      </div>
    </Fragment>
  );
};
