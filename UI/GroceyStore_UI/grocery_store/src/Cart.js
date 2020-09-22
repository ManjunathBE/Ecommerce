import React, { Component } from "react"
import Header from './Header'
import { useStore } from "./Store";


export const Cart = (props) => {
    const {cart, setCart} = useStore();
    const cartItems = cart.map((cart) =>
    <li key={cart.itemNumber}>
        {cart.productName} {cart.weight}
    </li>)

console.log(cart,'dfsdfsdf')
        return (
            <div>
                
                <Header title={(props.location.pathname).substring(1)}/>
                {cartItems}
            </div>
        )
    }
