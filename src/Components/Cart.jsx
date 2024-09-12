import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../Context/MyContext';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const Cart = () => {
  const { cart, setCart } = useContext(MyContext);
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleChange = (e, item) => {
    if(e.target.value > item.rating.count){
      e.target.value=item.rating.count;
        alert(`out of stock!!! choose below ${item.rating.count}`)
    }
    const updatedCart = localCart.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, totalPrice: (e.target.value * cartItem.price).toFixed(2), quantity: e.target.value }
        : cartItem
    );
    setLocalCart(updatedCart);
    setCart(updatedCart);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRemoveButton = (item) => {
    
    const updatedCart = localCart.filter(cartItem => cartItem.id !== item.id);
    setLocalCart(updatedCart);
    setCart(updatedCart);
  };

  return (
    <div className='p-5 d-flex flex-column justify-content-center w-100 align-items-center'>
      {localCart.map((item) => (
        <div className='p-5 mt-5' key={item.id} style={{ border: "1px solid black", width: "50rem", borderRadius: "10px" }}>
          <form onSubmit={handleSubmit}> 
            <div className="d-flex justify-content-between">
              <div><img src={item.image} width={100} height={100} alt="productImg" /></div>
              <div style={{ padding: "10px", width: "20rem" }}>
                <div><h4>{item.title}</h4></div>
                <div  id='multiline-ellipsis-cart'><div style={{text:"bold"}}>details & core</div> <div>{item.description}</div></div>
              </div>
              <div className='text-center d-flex flex-column justify-content-between align-items-end'>
                <div>
                  <label className='mx-3'>Quantity:</label>
                  <input type="number" min={1} name='count' defaultValue={item.quantity}  onChange={(e) => handleChange(e, item)} max={item.rating.count} required/>
                </div>
                <div><label className='mx-3'>Price: </label> ${item.price}</div>
                <div className='text-danger' style={{ textAlign: "bottom", cursor: "pointer" , border:"1px solid", width:"5rem", borderRadius:"10px"}} onClick={() => handleRemoveButton(item)}>remove</div>
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
      ))}
    </div>
  );
};

export default Cart;
