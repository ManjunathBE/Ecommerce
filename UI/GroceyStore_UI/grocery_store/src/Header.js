import React, { Component, useState } from "react"
import { Grid, Typography, NativeSelect,Container } from "@material-ui/core"
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import { useStore } from "./Store";

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export const Header = (props) => {
    const { history } = props;
    const [currentPage, setCurentPage] = useState();
    const { cartStore } = useStore();

    const handlePageChange = (event) => {
        console.log(history.location,'locaiton in header')
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value, currentPage, 'header dropdown')
        setCurentPage(
            value
        );

        switch (value) {
            case "Dashboard":
                history.push("/")
                break;

            case "My Account":
                history.push("/UserProfile")
                break;

            case "My Orders":
                history.push("/History")
                break;

            case "Cart":
                history.push("/Cart")
                break;

            case "Payment":
                history.push("/History")
                break;

            case "Suggestion":
                history.push("/Feedback")
                break;


            default:
                break;
        }
    };

    const handleCartClick =()=>{
        setCurentPage("Cart")
        history.push("/Cart")
    }

    return (

            
<Container maxWidth="lg">
<div id="header">
            <Grid container>
                <Grid xs={3}>
                    <Typography onClick={() => history.push('/')} > Slr Organics </Typography>
                </Grid>

                <Grid xs={9} >
                    <div className="positionRight">
                    <NativeSelect
                        value={currentPage}
                        onChange={handlePageChange}
                        name="Navigator"
                    >
                        <option value="Dashboard">Dashboard</option>
                        <option value="My Account">My Account</option>
                        <option value="My Orders">My Orders</option>
                        <option value="Cart">My Cart</option>
                        <option value="Payment">Payment</option>
                        <option value="Suggestion">Feedback</option>
                    </NativeSelect>
              
                    <IconButton aria-label="cart" onClick={handleCartClick}>
                        <StyledBadge badgeContent={cartStore.cart.length} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                    </div>
                </Grid>
            </Grid>
            </div>
            </Container>

    )
}
