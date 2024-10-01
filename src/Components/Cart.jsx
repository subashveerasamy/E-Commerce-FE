import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import MyContext from '../Context/MyContext';
import OrderPlace from './OrderPlace';
import styled from 'styled-components';


const Order=styled.div`
    min-height: 86vh;
   display: flex;
    justify-content: center;
    
`


const Cart = () => {
  const { cart, setCart } = useContext(MyContext);
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cart.length > 0) {
        const updatedCart = await Promise.all(cart.map(async (item) => {
          
          const quantity = parseInt(item.quantity) || 1;
          
          const response = await axios.get(`https://e-commerce-be-828a.onrender.com/products/getProductById/${item._id}`);
          const totalPrice = (quantity * response.data.data.price).toFixed(2);

          return {...response.data.data, quantity, totalPrice};
        }));
        setLocalCart(updatedCart);
        //console.log(updatedCart);
      }
    };
     
    fetchCartProducts();
  },[cart]);

  const handleChange = (e, item) => {
    if (e.target.value > item.count) {
      e.target.value = item.count;
      alert(`Out of stock! Choose below ${item.count}`);
    }
    
    const updatedCart = localCart.map(cartItem =>
      cartItem._id === item._id
        ? { ...cartItem, totalPrice: (e.target.value * cartItem.price).toFixed(2), quantity: e.target.value }
        : cartItem
    );
    const updateUserCart=async()=>{
      const response=await axios.put("https://e-commerce-be-828a.onrender.com/user/updateCart",{cart:updatedCart},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }
      );
    }
    updateUserCart();

    
    setLocalCart(updatedCart);
    setCart(updatedCart);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRemoveButton = async(item) => {
    const updatedCart = localCart.filter(cartItem => cartItem._id !== item._id);
    setLocalCart(updatedCart);
    const response = await axios.put("https://e-commerce-be-828a.onrender.com/user/updateCart", {cart: updatedCart},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }
    );
    setCart(updatedCart);
  };

  return (
      <div>
        {   cart.length > 0 ? (
      <div className='d-flex flex-wrap justify-content-center bg-secondary-subtle ' id='cartPagem' style={{height:"auto",minHeight:"80vh"}}>
      <div className='p-5 d-flex flex-column justify-content-center align-items-center' style={{width:"auto", maxWidth:"50rem"}}>
        {localCart.map((item, index) => (
          <CartItem 
            key={index} 
            item={item} 
            handleRemoveButton={handleRemoveButton} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
          />
        ))}
      </div>
      <Order style={{flex:"1"}}>
        <OrderPlace localCart={localCart} setLocalCart={setLocalCart}/>
      </Order>
    </div>
    ):(
      <div className='d-flex justify-content-center align-items-center' style={{width:"100%", height:"100%", background:"white"}}>
        
     <img  src="/cartPage.webp" style={{marginTop:"120px"}} width={400} height={400} alt="emptyCart" />
      </div>
    )
    
   }
      </div>
 
  )
};

const CartItem = ({ item, handleRemoveButton, handleChange, handleSubmit }) => {
  

  const handleClick = () => {
   handleRemoveButton(item); 
  };

  return (
    <div style={{paddingTop:"80px"}}>
      <div className='p-5 mt-5' id='cartItem' style={{ border: "1px solid white", borderRadius: "10px", boxShadow:"0 0 25px #33234b", background:"#c3b5d7" }}>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap justify-content-evenly" id='cartCardTitle'>
          <div><img src={item.image} width={100} height={100} alt="productImg" /></div>
          <div style={{ padding: "10px", minWidth: "10rem", maxWidth: "20rem" }}>
            <div><h4>{item.title}</h4></div>
            <div id='multiline-ellipsis-cart'><div style={{ fontWeight: "bold" }}>Details & Core</div> <div>{item.description}</div></div>
          </div>
          <div className='mt-3 text-center d-flex flex-column justify-content-between' id='cartQuantity'>
            <div className='d-flex'>
              <label className='mx-3'>Quantity:</label>
              <input className='form-control' style={{ width: "5rem" }} type="number" value={item.quantity || 1} min={1} name='count' onChange={(e) => handleChange(e, item)} max={item.count} required />
            </div>
            <div><label className='mx-3'>Price: </label> ${item.price}</div>
            <button id='cartRemoveBtn'
              className="btn btn-danger" 
              style={{ textAlign: "bottom", cursor: "pointer", border: "1px solid white", width: "5rem", borderRadius: "10px" }} 
              onClick={handleClick}
            >
              Remove
            </button>
          </div>
        </div>
        <hr />
        <div className='d-flex justify-content-between ms-5'>
          <div className='text-secondary'>SUBTOTAL</div>
          <div className='text-secondary'>${item.totalPrice}</div>
        </div>
        <div className='d-flex justify-content-between ms-5'>
          <div className='text-secondary'>SHIPPING</div>
          <div className='text-secondary'>FREE</div>
        </div>
        <hr />
        <div className='d-flex justify-content-between ms-5'>
          <div>TOTAL</div>
          <div>${item.totalPrice}</div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Cart;
