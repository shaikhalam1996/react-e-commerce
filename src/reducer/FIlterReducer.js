const FIlterReducer = (state,action)=> {
    
    switch(action.type){
        case 'LOAD_FILTER_API_DATA':
            // console.log(action.type)
            return {
                ...state,
                filter_products:[...action.payload],
                all_products:[...action.payload],
            }


        case 'SET_GRID_VIEW':
                // console.log(action.type)
                return {
                    ...state,
                    grid_view:true
                }

        case 'SET_LIST_VIEW':
                    // console.log(action.type)
                return {
                    ...state,
                    grid_view:false
                }

        case 'GET_SORT_VALUE':
                // console.log(action.type)
                // let dropDownValue = document.getElementById('sort');
                // let sort_value = dropDownValue.options[dropDownValue.selectedIndex].value;
                // console.log('sort_value==========',sort_value)
                return {
                    ...state,
                    sorting_value: action.payload,
                }

        case 'SORT_PRODUCTS':
               let newSortValue;
               const {filter_products,sorting_value} = state
               let tempSortValue = [...filter_products];
            //    console.log("sorting_value====",sorting_value)

               const sortProducts = (a,b) =>{
            //    console.log("sorting_value====",sorting_value)

                    if(sorting_value === 'lowest'){
                        return a.price - b.price
                    }

                    if(sorting_value === 'highest'){
                        return b.price - a.price
                    }
    
                    if(sorting_value === 'a-z'){
                        return a.name.localeCompare(b.name)
                    }

                    if(sorting_value === 'z-a'){
                            return b.name.localeCompare(a.name)
                    }
               }

               newSortValue = tempSortValue.sort(sortProducts)

                return {
                    ...state,
                    filter_products:newSortValue
                }


            case 'UPDATE_FILTER_VALUE':
                    // console.log(action.type)
                    const {name,value}=action.payload
                return {
                    ...state,
                    filter:{
                        ...state.filter,
                        [name]:value
                    },
                }

            case 'FILTER_SEARCH_PRODUCTS':
                    // console.log(action.type)
                    const {all_products}= state;
                    let tempFilterData = [...all_products]

                    let {text,category,company,color}= state.filter;
                    // console.log("company=======",company)
                    // console.log("category======",category)
                    // console.log("color======",color)



                    if(text){
                        tempFilterData = tempFilterData.filter((curElem)=>{
                           return curElem.name.toLowerCase().includes(text)
                        })
                    }

                    if(category !== 'All'){
                            tempFilterData = tempFilterData.filter((curElem)=>{
                               return curElem.category === category
                            })
                    }

                    if(company !== 'All'){
                            tempFilterData = tempFilterData.filter((curElem)=>{
                               return curElem.company === company
                            })
                    }

                    if (color !== "All") {
                        tempFilterData = tempFilterData.filter((curElem) =>
                          curElem.colors.includes(color)
                        );
                      }
                 
                    return {
                        ...state,
                        filter_products:tempFilterData
                    }


        case 'CLEAR_FILTER':
                return {
                     ...state,
                    filter:{
                        ...state.filter,
                        text: "",
                        category:"All",
                        company:"All",
                        color: "All",
                        maxPrice: state.filter.maxPrice,
                        price: state.filter.price,
                        minPrice: state.filter.minPrice,
                    }
                }

        default:
            return state
    }

}

export default FIlterReducer;