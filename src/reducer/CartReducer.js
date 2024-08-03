const CartReducer = (state,action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
        let {id,amount,color,singleProduct} = action.payload
        // console.log(singleProduct)
        // console.log(color)
        // console.log(amount)
        // console.log(id)
        let existProduct = state.cart.find((curElem)=>{
              return curElem.id === id+color
        })
        // console.log(existProduct)
        if(existProduct){
          let updatedProduct = state.cart.map((curElem)=>{
            if(curElem.id === id+color){
              let newAmount = curElem.amount + amount;
                if(newAmount>=curElem.max){
                  newAmount=curElem.max
                }
              return{
                ...curElem,
                amount:newAmount
              }
            }else{
              return curElem
            }
          })

          return{
            ...state,
            cart:updatedProduct
          }
        }else{

          let cartProducts = {
            id:id+color,
            name:singleProduct.name,
            color:color,
            amount:amount,
            image:singleProduct.image[0].url,
            price:singleProduct.price,
            max:singleProduct.stock
          }
  
         return{
          ...state,
          cart:[...state.cart,cartProducts]
         }

        }

       case 'REMOVE_TO_CART': 
          let filterItem = state.cart.filter((curElem)=>{
              return curElem.id !== action.payload
          })

          return{
            ...state,
            cart:filterItem
          }
  
      case 'CLEAR_CART':
        return{
          ...state,
          cart:[]
        }

      case 'INCREMENT_CART_ITEM':
        let incrementProduct = state.cart.map((curElem)=>{
          if(curElem.id === action.payload){
            let incrementAmount = curElem.amount + 1;
              if(incrementAmount>=curElem.max){
                incrementAmount=curElem.max
              }
            return{
              ...curElem,
              amount:incrementAmount
            }
          }else{
            return curElem
          }
        })

          return{
            ...state,
            cart:incrementProduct
          }

      case 'DECREMENT_CART_ITEM':
        let decrementProduct = state.cart.map((curElem)=>{
          if(curElem.id === action.payload){
            let decAmount = curElem.amount - 1;
              if(decAmount<=1){
                decAmount=1
              }
            return{
              ...curElem,
              amount:decAmount
            }
          }else{
            return curElem
          }
        })

        return{
          ...state,
          cart:decrementProduct
        }


      // case 'TOTAL_CART_ITEM':
      //   let updatedItem = state.cart.reduce((initialValue,curElem)=>{
      //       let {amount} = curElem;

      //       initialValue = initialValue + amount;

      //       return initialValue;
      //   },0)

      //     return{
      //       ...state,
      //       total_item:updatedItem
      //     }


      // case 'CART_TOTAL_PRICE':
      //     let updatedPrice = state.cart.reduce((initialValue,curElem)=>{
      //           let {amount,price} = curElem;
    
      //           initialValue = initialValue + price * amount;
    
      //           return initialValue;
      //       },0)
            
      //         return{
      //           ...state,
      //           total_amount:updatedPrice
      //         }
  
        case 'CART_TOTAL_ITEM_PRICE':
                let {total_item,total_amount} = state.cart.reduce((accumulator,curElem)=>{
                      let {amount,price} = curElem;
          
                      accumulator.total_item = accumulator.total_item + amount;

                      accumulator.total_amount = accumulator.total_amount + price * amount;
          
                      return accumulator;
                  },{
                    total_item:0,
                    total_amount:0
                  })
                  
                    return{
                      ...state,
                      total_item,
                      total_amount
                    }
    default:
        return state;
  }
}

export default CartReducer