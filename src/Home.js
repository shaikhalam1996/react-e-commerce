import React from 'react'
import FeaturedProduct from './components/FeaturedProduct';
import Herosection from './components/Herosection';
import Service from './components/Service';
import Trusted from './components/Trusted';
// import { useGlobalProductContext } from './context/ProductContext';


const Home = () => {

  const data ={
    name:"Grocery Store"
  }

  return( 
    <>
      <Herosection myData={data}/>
      <FeaturedProduct/>
      <Service/>
      <Trusted/>
    </>
  )
    
  }

export default Home;
