import React, { useState } from "react"
import { Grid, Typography, NativeSelect, Container } from "@material-ui/core"
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useStore } from "./Store";
import { useAuth } from './Auth'

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 3,
        top: 30,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
   
container:{
    [theme.breakpoints.down('md')]: { 
        padding: '0px'
      },
},
  
    title: {
        margin: "auto",
        fontSize: "x-large",
        padding: theme.spacing(2),
        cursor: "pointer",
        [theme.breakpoints.down('md')]: {
            fontSize: "large"
        },
    },
    cartIcon: {
        fontSize: "50px",
        padding: theme.spacing(1),
        cursor: "pointer",
        color: 'white'
    },
    MuiNativeSelect: {
            fontSize: "large",
            cursor: "pointer",
            color: "white",
            backgroundColor: 'darkslategray',     
        "& option": {
            backgroundColor: 'darkslategray'
            
        },
        '&:not([multiple]) option, &:not([multiple]) optgroup': {
            backgroundColor: 'darkslategray',
            padding:theme.spacing(1)
          }
    },
    Select:{
        
    }
    
    }))


export const Header = (props) => {
    const { history } = props;
    const [currentPage, setCurentPage] = useState();
    const { cartStore } = useStore();
    const classes = useStyles();
    console.log(history.location,'location in history')
    const { setLoginState } = useAuth()
    var location =history.location.pathname

    if(location!=='/'){
        location = history.location.pathname.substring(1)
    }
    

    const handlePageChange = (event) => {
        console.log(history.location, 'locaiton in header')
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value, currentPage, 'header dropdown')
        setCurentPage(
            value
        );

        switch (value) {
            case "/":
                history.push("/")
                break;

            case "UserProfile":
                history.push("/UserProfile")
                break;

            case "History":
                history.push("/History")
                break;

            case "Cart":
                history.push("/Cart")
                break;

            case "Payment":
                history.push("/Payment")
                break;

            case "Feedback":
                history.push("/Feedback")
                break;
            
            case "SignOut":
                window.localStorage.clear();
                setLoginState(false)
                history.push("/login")
                break;
            
            case "About":
                history.push("/About")
                break;
            
            case "Terms":
                history.push("/Terms")
                break;



            default:
                break;
        }
    };

    const handleCartClick = () => {
        setCurentPage("Cart")
        history.push("/Cart")
    }

    return (

        <Container className={classes.container} maxWidth="lg">
            <div id="header" >
                <Grid container>
                    <Grid xs={3}>
                        <Typography className={classes.title} onClick={() => history.push('/')} > SLR Organics </Typography>
                    </Grid>

                    <Grid xs={9} >
                        <div className="positionRight">
                            <NativeSelect
                                value={currentPage}
                                onChange={handlePageChange}
                                name="Navigator"
                                className={ classes.MuiNativeSelect }
                            >
                                <option value="/">Dashboard</option>
                                <option value="UserProfile">My Account</option>
                                <option value="History">My Orders</option>
                                <option value="Cart">My Cart</option>
                                <option value="Payment">Payment</option>
                                <option value="Feedback">Feedback</option>
                                <option value="About">About us</option>
                                <option value="Terms">Terms of use</option>
                                <option value="SignOut">Sign Out</option>
                            </NativeSelect>

                            <IconButton aria-label="cart" onClick={handleCartClick}>
                                <StyledBadge badgeContent={cartStore.cart.length} color="secondary">
                                    <ShoppingCartIcon className={classes.cartIcon} />
                                </StyledBadge>
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Container>

    )
}
