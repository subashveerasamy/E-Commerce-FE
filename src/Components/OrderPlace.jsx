
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import MyContext from '../Context/MyContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';




const OrderPlace = ({localCart, setLocalCart}) => {

  const {cart, setCart}=useContext(MyContext);
  const [addressPage, setAddressPage]=useState(false);

      let quantity=0, price=0;
  if(localCart.length>0){
    localCart.map((item) => {
          quantity+=parseInt(item.quantity);
          price+=parseFloat(item.totalPrice);
    })
  }

  useEffect(() => {
    
  }, [localCart]);

      const handlePlaceOrder = async() => {
          setAddressPage(true);
    
      }


      const formik=useFormik({
        initialValues:{
          name:"",
          address:"",
          city:"",
          state:"",
          pincode:"",
          mobile:""
        },
        onSubmit:async({name, address, city, state, pincode, mobile}, {resetForm})=>{
          try {
            const order= localCart.map((item)=>
              {
                return {
                  productId:item._id,
                  quantity:item.quantity,
                  price:parseFloat(item.totalPrice).toFixed(2)
                }
              })
            const deliveryAddress={
              name,
              address,
              city,
              state,
              pincode,
              mobile
            }
              const postorder=await axios.post("https://e-commerce-be-828a.onrender.com/order/newOrder",{order,totalQuantity:quantity,totalAmount:price, deliveryAddress},
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                  }
                }
              )
              alert("Order Placed Successfully");
              const removeFromCart = await axios.put("https://e-commerce-be-828a.onrender.com/user/updateCart", {cart: []},
                {
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                  }
                }
              );
              setLocalCart([]);
              setCart([]);
            resetForm({
              
                name:"",
                address:"",
                city:"",
                state:"",
                pincode:""
              
            });
          } catch (error) {
            console.log(error);
          }
          setAddressPage(false);
        },

        validationSchema:Yup.object({
          name: Yup.string().required("Name is required"),
          address: Yup.string().required("Address is required"),
          city: Yup.string().required("City is required"),
          state: Yup.string().required("State is required"),
          pincode: Yup.string()
            .required("Pincode is required")
            .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
          mobile: Yup.string()
            .required("Mobile is required")
            .matches(/^\d{10}$/, "Mobile must be exactly 10 digits")
        })


      })


  return (
    <div style={{paddingTop:"80px"}}>
      <div className='pb-5'>
      


      {
        addressPage ? (
          <div className="pb-3 border" id='cartItems' style={{ borderRadius: "15px", boxShadow: "0 0 30px #0f061b", minWidth: "25rem", maxWidth: "30rem", marginTop:"120px"}}>
      <form onSubmit={formik.handleSubmit} className='d-flex flex-column align-items-center' style={{width:"100%"}} >
            <div className='d-flex flex-column align-items-center' >
              <div className='mt-3 mb-4 text-light' style={{fontSize:"25px"}}>
                Delivery Address
              </div>
              <div>
              <input type="text" name='name' placeholder='Name' {...formik.getFieldProps("name")} className='form-control mt-4'  />
                {formik.errors.name && formik.touched.name ? <div className='text-danger'>{formik.errors.name}</div> : null}
              </div>
              <div>
              <input type="text" name='address' placeholder='Address' {...formik.getFieldProps("address")} className='form-control mt-4' />
                {formik.errors.address && formik.touched.address ? <div className='text-danger'>{formik.errors.address}</div> : null}
              </div>
              <div>
              <input type="text" name='city' placeholder='City' {...formik.getFieldProps("city")} className='form-control mt-4' />
                  {formik.errors.city && formik.touched.city ? <div className='text-danger'>{formik.errors.city}</div> : null}
              </div>
              <div><input type="text" name='state' placeholder='State' {...formik.getFieldProps("state")} className='form-control mt-4' />
                  {formik.errors.state && formik.touched.state ? <div className='text-danger'>{formik.errors.state}</div> : null}
              </div>
              <div><input type="number" name='pincode' placeholder='Pincode' {...formik.getFieldProps("pincode")} className='form-control mt-4' />
                  {formik.errors.pincode && formik.touched.pincode ? <div className='text-danger'>{formik.errors.pincode}</div> : null}
              </div>
              <div>
                <input type="tel" name='mobile' placeholder='Mobile' {...formik.getFieldProps("mobile")} className='form-control mt-4'   />
                  {formik.errors.mobile && formik.touched.mobile ? <div className='text-danger'>{formik.errors.mobile}</div> : null}
              </div>
               <div className='mt-4'>
               <input type="submit" id='orderPlaceBtn' value="Place Order" className='btn btn-warning' style={{width:"10rem"}} />
     
               </div>
            </div>
        </form>
    </div>
  
  
        ) : (
          <div className='px-5 pb-5 d-flex flex-column align-items-center text-light '  style={{marginTop:"100px" , borderRadius:"15px"}}>
    <div className="grid-container p-3 border" id='cartItems' style={{borderRadius:"15px", boxShadow:"0 0 30px #0f061b", minWidth:"10rem", maxWidth:"60rem"}}>
    <div className="grid-item">S.No</div>
    <div className="grid-item" style={{
          maxWidth:"20rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>Product</div>
    <div className="grid-item" style={{textAlign:"center"}}>Quantity</div>
    <div className="grid-item" style={{textAlign:"center"}}>Price</div>
  
    {localCart.map((item, index) => (
      <React.Fragment key={index}>
        <div className="grid-item">{index + 1}</div>
        <div className="grid-item" style={{
          maxWidth:"20rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>{item.title}</div>
        <div className="grid-item" style={{textAlign:"center"}}>{item.quantity}</div>
        <div className="grid-item" style={{textAlign:"center"}}>${item.totalPrice}</div>
        
      </React.Fragment>
      
    ))}
  <div className="grid-item "></div>
  <div className="grid-item ">Total</div>
       
        <div className="grid-item" style={{textAlign:"center"}}>{quantity}</div>
        <div className="grid-item" style={{textAlign:"center"}}>${price.toFixed(2)}</div>
     
  
  </div>
  
  <div className='mt-4'>
  <button 
    className="btn btn-warning" 
    id='orderPlaceBtn' 
    style={{ width: "10rem", display: localCart.length > 0 ? 'block' : 'none' }} 
    onClick={handlePlaceOrder}
  >
    Place Order
  </button>
  
    </div>
      </div>
        )
  
      }
      </div>
    </div>
  )
}





export default OrderPlace