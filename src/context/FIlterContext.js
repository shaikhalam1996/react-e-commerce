import { createContext, useContext, useReducer, useEffect } from "react";
import { useGlobalProductContext } from "./ProductContext";
import reducer from "../reducer/FIlterReducer";

const filterContext = createContext();

const initalState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filter: { 
      text: "",
      category:"All",
      company:"All",
      color: "All",
      maxPrice: 0,
      price: 0,
      minPrice: 0,
    }
};

// AppProvider
const FilterContextProvider = ({ children }) => {
  const { products } = useGlobalProductContext();

  const [state, dispatch] = useReducer(reducer, initalState);

  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  const sorting = event => {
    let sortValue = event.target.value;
    // console.log(value)
    return dispatch({ type: "GET_SORT_VALUE", payload: sortValue });
  };

  const updateFilterValue = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    // if (name === "company") {
    //   value = e.target.value;
    // }
    return dispatch({ type: "UPDATE_FILTER_VALUE", payload: {name,value} });
  }

  const clearFilters = () => {
    return dispatch({ type: "CLEAR_FILTER"});
  };

  useEffect(
    () => {
      dispatch({ type: "SORT_PRODUCTS" });
      dispatch({ type: "FILTER_SEARCH_PRODUCTS"});
    },
    [state.sorting_value, products,state.filter]
  );

  useEffect(
    () => {
      dispatch({ type: "LOAD_FILTER_API_DATA", payload: products });
    },
    [products]
  );

  return (
    <filterContext.Provider
      value={{ ...state, setGridView, setListView, sorting ,updateFilterValue, clearFilters}}
    >
      {children}
    </filterContext.Provider>
  );
};

const useGlobalFilterContext = () => {
  return useContext(filterContext);
};

export { filterContext, FilterContextProvider, useGlobalFilterContext };
