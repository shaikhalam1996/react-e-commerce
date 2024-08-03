import { createContext ,useContext, useEffect, useReducer} from "react";
import axios from 'axios'
import reducer from "../reducer/ProductReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initalState ={
    isLoading:false,
    isError:false,
    products:[],
    featureProduct:[],
    isSingleProductLoading:false,
    singleProduct:{}
}

const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initalState);

    const getProduct = async (url)=> {
        dispatch({type:"SET_LOADING"})
        try {
            const res = await axios.get(url)
            const products = await res.data;
            dispatch({type:"SET_API_DATA",payload:products})
        } catch (error) {
            dispatch({type:"API_ERROR"})
        }
    }

    const getSingleProduct = async (url)=> {
        dispatch({type:"GET_SINGLE_LOADING"})
        try {
            const res = await axios.get(url)
            const singleProducts = await res.data;
            dispatch({type:"GET_SINGLE_API_DATA",payload:singleProducts})
        } catch (error) {
            dispatch({type:"GET_SINGLE_API_ERROR"})
        }
    }

    useEffect(()=>{
        getProduct(API);
    },[])

    return <AppContext.Provider value={{...state,getSingleProduct}}>{children}</AppContext.Provider>
}

const useGlobalProductContext = () =>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalProductContext}