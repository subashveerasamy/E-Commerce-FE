
import  { useEffect, useState } from 'react'
import NavBar from './Components/NavBar'
import productInfo from './Context/productsInfo.jsx'
import MyContext from './Context/MyContext.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const App = () => {
  
  const [cards, setCards]=useState(
    [1]);
    const [cart, setCart] = useState([]);
    const [searchCard, setSearchCard]= useState([]);
    const navigate=useNavigate();
    const [miniSearchClick, setMiniSearchClick]= useState(false)

    useEffect(()=>{
      console.log("App");
      const fetchProducts= async()=>{
        
      const products= await axios.get("http://localhost:5000/products/getProducts");
      if(products){
      setCards(products.data.data);
      setSearchCard(products.data.data);
      }
      }
      fetchProducts();


      const getCart=async()=>{
        console.log(sessionStorage.getItem("token"));
                const cartproducts=await axios.get("http://localhost:5000/user/getcart",{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        if(cartproducts.data.msg === 'Token is not valid'){
          navigate("/")
        }
        if(cartproducts ){
          
          setCart(cartproducts.data.cart)
          //console.log(cartproducts.data.cart)
        }
      }
      
      getCart();

},[])


  
    
   

  
  
  return (
    <MyContext.Provider value={{cart, setCart}}>
      <productInfo.Provider value={{cards, setCards}}>
    <div className='bg-secondary-subtle'  style={{overflow:"hidden"}}>
     
     <NavBar miniSearchClick={miniSearchClick} setMiniSearchClick={setMiniSearchClick} searchCard={searchCard} />
   <div onClick={()=> setMiniSearchClick(false)} >
    
   <Outlet/>
 
   </div>
      </div>
      </productInfo.Provider>
    </MyContext.Provider>
   
  )
}

export default App