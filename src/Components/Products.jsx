

import Test from './Test';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect} from 'react';
import productInfo from '../Context/productsInfo';
import MyContext from '../Context/MyContext';



const Products = () => {
  const {cart,setCart}=useContext(MyContext);
 
  useEffect(()=>{
    
    setCart(cart);
},[cart])
  const {cards, setCards}=useContext(productInfo)
  return (
         
    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
    {
      cards.map((value, index)=>(
        
        <div className='col mb-5' key={value.id} >
    <div className="card" style={{maxWidth:" 15rem", height:"25rem"}} >
<img  src={value.image} width={100} height={200} className=" p-4 card-img-top " alt="img"  style={{ position:"relative"}}/>
<div className='bg-secondary text-light p-1 ' style={{position:"absolute", right:"20px" , top:"10px", borderRadius:"10px"}}><FontAwesomeIcon icon={faStar} color='yellow' />     { value.rating.rate}</div>
 
<div className="card-body">
   <h5 className="card-title text-center" id="multiline-ellipsis">{value.title}</h5>
  <p className="card-text text-center" >  ${value.price}</p>
  {/* <button className="btn btn-primary" onClick={() => handleButtonFunc(index)}>{value.status}</button> */}
  <Test item={value}  />

</div>
</div>
</div>
      ))
    }
    </div>
   
  )
}



export default Products

