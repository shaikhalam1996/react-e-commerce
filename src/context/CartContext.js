import { createContext, useContext, useReducer, useEffect} from "react";
import reducer from "../reducer/CartReducer";

const CartContext = createContext();

const getCartFromLocalStorage = () =>{
    let cartData = localStorage.getItem("myCart");

    if(cartData === []){
        return [];
    }else{
        return JSON.parse(cartData);
    }
}
const initialState = {
    cart:getCartFromLocalStorage(),
    total_item:"",
    total_amount:"",
    shipping_fees:50000
}
const CartContextProvider = ({children}) => {
    const[state,dispatch] = useReducer(reducer,initialState);

    const addToCart = (id,amount,color,singleProduct) =>{
        dispatch({type:"ADD_TO_CART",payload:{id,amount,color,singleProduct}})
    }

    const removeToCart = (id) =>{
        dispatch({type:"REMOVE_TO_CART",payload:id})
    }

    const setIncrement = (id) =>{
        dispatch({type:"INCREMENT_CART_ITEM",payload:id})
    }

    const setDecrement = (id) =>{
        dispatch({type:"DECREMENT_CART_ITEM",payload:id})
    }

    const clearCart = () =>{
        dispatch({type:"CLEAR_CART"})
    }

    useEffect(()=>{
        // dispatch({type:"TOTAL_CART_ITEM"});
        // dispatch({type:"CART_TOTAL_PRICE"});
        dispatch({type:"CART_TOTAL_ITEM_PRICE"});
        localStorage.setItem("myCart",JSON.stringify(state.cart))
    },[state.cart])


    return <CartContext.Provider value={{...state,addToCart,removeToCart,clearCart,setIncrement,setDecrement}}>{children}</CartContext.Provider>
}

const useGlobalCartContext = () => {
       return useContext(CartContext)
}

export {useGlobalCartContext,CartContextProvider,CartContext}