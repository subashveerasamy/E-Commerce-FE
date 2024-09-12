import React, { useContext, useState } from 'react'
import Banner from './Banner'
import productInfo from '../Context/productsInfo'
import Products from './Products'
import MyContext from '../Context/MyContext'


const Home = () => {
    const {cards, setCards}=useContext(productInfo);
    const {cart, setCart}=useContext(MyContext)
    //console.log("Home:",cart)
   
    
  return (
    <div> <Banner/>
    <div className="container px-4 px-lg-5 mt-5">
    
  <Products/>
   </div>
 </div>
  )
}

export default Home