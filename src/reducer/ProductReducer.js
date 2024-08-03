const ProductReducer = (state,action)=> {
    
    switch(action.type){
        case 'SET_LOADING':
            // console.log(action.type)
            return {
                ...state,
                isLoading:true
            }

        case 'API_ERROR':
            // console.log(action.type)

            return {
                ...state,
                isLoading:false,
                isError:true
            }

        case 'SET_API_DATA':
            // console.log(action.type)
            const featuredProducts = action.payload.filter((curElem)=>{
                return curElem.featured === true
            })
            // console.log(action.payload)
                return {
                    ...state,
                    isLoading:false,
                    products:action.payload,
                    featureProduct:featuredProducts
                }


        case 'GET_SINGLE_LOADING':
            // console.log(action.type)
            return {
                ...state,
                isSingleProductLoading:true
            }

        case 'GET_SINGLE_API_ERROR':
                // console.log(action.type)
                return {
                    ...state,
                    isSingleProductLoading:false,
                    isError:true
                }

        case 'GET_SINGLE_API_DATA':
                    // console.log(action.type)
                    return {
                        ...state,
                        isSingleProductLoading:false,
                        singleProduct:action.payload
                    }
        


        default:
            return state
    }

}

export default ProductReducer;