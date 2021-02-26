import { Grid } from '@material-ui/core';
import { InsertInvitation, Store } from '@material-ui/icons';
import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = { view: "", cart: [], user: {}, token:"", address:{}};

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
                    price: action.price,
                    productId: action.productId,
                    itemPrice: action.itemPrice
                }]
            }
        case 'Update':
            return {
                ...state, cart: state.cart.map((item) => (item.productName === action.productName ?
                    {
                        ...item, quantity: action.quantity,
                        unit: action.unit, price: action.price, productId: action.productId, itemPrice: action.itemPrice
                    } : item))
            }

        case 'Delete':
            return {
                ...state, cart: state.cart.filter(item => item.productName !== action.item)
            }
        
        case 'DeleteAll':
            return{
                cart:[]
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
    var address = action.address
    
    switch (action.type) {
        case 'Address': {
            return { ...state, user: { ...state.user, address:  address } }
        }
        case 'User': {
            return { ...state, user: action.user }
        }
        default:
            return state
    }
}

const addressReducer =(state,action) =>{
    console.log(action,'address reducer')
    return {...state, address:action.address}
}

const tokenReducer = (state, action) => {
    console.log('in token reducer', action)
    return { ...state, token: action.token }

}

export const StoreProvider = ({ children }) => {
    const [cartStore, setCartStore] = useReducer(cartReducer, initialState);
    const [viewStore, setviewStore] = useReducer(viewReducer, initialState)
    const [userStore, setUserStore] = useReducer(userReducer, initialState)
    const [tokenStore, setTokenStore] = useReducer(tokenReducer, initialState)
    const [addressStore, setAddressStore] = useReducer(addressReducer, initialState)
    return (
        <StoreContext.Provider value={{
            cartStore, setCartStore, viewStore, setviewStore, userStore, setUserStore,
            tokenStore, setTokenStore, addressStore, setAddressStore
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);