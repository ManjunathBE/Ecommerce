import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = [];

const cartReducer = (state, action) => {

    console.log('actionnnnn', action)
    console.log('state', state)
    var itemNumber = 1

    switch (action.type) {
        case 'Add':
            return [
                ...state, {
                    itemNumber: itemNumber++,
                    productName: action.productName,
                    weight: action.weight,
                    units: action.units
                }
            ]
        case 'Update':
            return state.map((item)=>(item.productName===action.productName ? 
                            {...item, weight:action.weight, units:action.units} : item))

        case 'Delete':
            return {
                // todo

            }
        default:
            return initialState
    }
}

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useReducer(cartReducer, initialState);
    console.log(cart, 'carrttt')
    console.log(children, 'children')
    return (
        <StoreContext.Provider value={{ cart, setCart }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);