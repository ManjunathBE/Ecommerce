import { Grid } from '@material-ui/core';
import { InsertInvitation, Store } from '@material-ui/icons';
import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = { view: "", cart: [], user:{} };

const cartReducer = (state = initialState, action) => {

    var itemNumber = 1
    console.log(action, 'action in store')

    switch (action.type) {
        case 'Add':
            console.log('in store add')
            return {
                ...state, cart: [...state.cart, {
                    productName: action.productName,
                    quantity: action.quantity,
                    unit: action.unit,
                    price: action.price
                }]
            }
        case 'Update':
            return {
                ...state, cart: state.cart.map((item) => (item.productName === action.productName ?
                    { ...item, quantity: action.quantity,
                        unit: action.unit, price: action.price } : item))
            }

        case 'Delete':
            return {
                ...state, cart: state.cart.filter(item => item.productName !== action.item)
            }

        case 'AddFromHistory':       
            return {
                ...state, cart: [{
                    productName: action.item.productName,
                    quantity: action.item.quantity,
                    unit: action.item.unit,
                    price: action.item.price
                }]
            }
        default:
            return initialState
    }
}

const viewReducer = (state, action) => {
    return { ...state, view: action.view }
}

const userReducer = (state, action) => {
    console.log('in user store', action)
    switch (action.type) {
        case 'Address': {
            return {...state, address:[...state.user.address,{action}]}
        }
        case 'User':{
            return { ...state, user: action.user }
        }

        default:
            return state
    }   
}

// const userReducer = (state, action) =>{

//     console.log('in user store', action)
//     return {...state, user: action.user}
// }

export const StoreProvider = ({ children }) => {
    const [cartStore, setCartStore] = useReducer(cartReducer, initialState);
    const [viewStore, setviewStore] = useReducer(viewReducer, initialState)
    const [userStore, setUserStore] = useReducer(userReducer, initialState)
    return (
        <StoreContext.Provider value={{ cartStore, setCartStore, viewStore, setviewStore, userStore, setUserStore }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);