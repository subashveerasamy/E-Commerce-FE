
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRef, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap';

const Orders = () => {
const [orders, setOrders] = useState([]);
const [click, setClick]=useState(false);
const [delivery, setDelivery]=useState({
    address:"",
    city:"",
    state:"",
    pincode:"",
    name:"",
    mobile:"",
    orderId:"",
    status:"",
    orderDate:"",
    ordered_products:""
});
const addressRef=useRef(null);
const [filter, setFilter]=useState('all');
const [ selectedReviewProduct, setSelectedReviewProduct]= useState(null);

const handleOptionChange= (e) => {
    setSelectedReviewProduct(e.target.value);
}

const [button, setButton]=useState('');
const [deliveryAddress, setDeliveryAddress]=useState({
    address:"",
    city:"",
    state:"",
    pincode:"",
    name:"",
    mobile:""
});
const [buttonStatus, setButtonStatus]=useState('');
useEffect(() => {
    const fetchOrders = async () => {
        
        try {
            const response = await axios.get("http://localhost:5000/order/getOrders",
                {
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                  }
            );
            if (response) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchCartProducts = async (orders) => {
        try {
            const updatedCart = await Promise.all(orders.map(async (eachOrder) => {
                const order = eachOrder.order;
                const updatedOrder = await Promise.all(order.map(async (item) => {
                    
                    const response = await axios.get(`http://localhost:5000/products/getProductById/${item.productId}`);
                    
                    if(response){
                        item.title = response.data.data.title;
                        item.image = response.data.data.image;
                        
                    }
                    return { ...item };
                }));
                return { ...eachOrder, order: updatedOrder };
            }));
            setOrders(updatedCart);
            
        } catch (error) {
            console.error('Error fetching cart products:', error);
        }
    };

   

    const fetchData = async () => {
        await fetchOrders();
        if (orders.length > 0) {
            await fetchCartProducts(orders);
        }
    };

    fetchData();
}, [orders.length]);

const handleAddressClick = (order, ref) => {
    setClick(true);
    if(ref.current){
        ref.current.scrollIntoView({ behavior: 'smooth' });
   
    }
    
    setButtonStatus('');
    setDelivery({
        address:order.deliveryAddress.address,
        city:order.deliveryAddress.city,
        state:order.deliveryAddress.state,
        pincode:order.deliveryAddress.pincode,
        name:order.deliveryAddress.name,
        mobile:order.deliveryAddress.mobile,
        orderId:order._id,
        status:order.status,
        orderDate:order.orderDate,
        ordered_products:order.order
    });
    if(order.status === 'pending')
        setButton('pending');
    else if(order.status === 'shipped')
        setButton('shipped');
    else if(order.status === 'delivered')
        setButton('delivered');
    else{
        setButton('cancelled');
    }
   
   
};

const handleUpdateAddress=async()=>{
    for (let key in deliveryAddress) {
        if (deliveryAddress[key] === "") {
            deliveryAddress[key] = delivery[key];
        }
        else{
            delivery[key]=deliveryAddress[key];
        }
    }

    
    const updatedOrders = orders.map((order) => {
        if (order._id === delivery.orderId) {
            return { ...order, deliveryAddress: deliveryAddress };
        }
        return order;
    });
    setOrders(updatedOrders);
    setButton('pending');

    
    
        
        const response = await axios.put("http://localhost:5000/order/updateDeliveryAddress",{deliveryAddress, orderId:delivery.orderId},
            {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
              }
        );
      
   
}

const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prevDelivery) => ({
        ...prevDelivery,
        [name]: value
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus(delivery.status);
    handleUpdateAddress();
};

const handleCancelOrder= async()=>{
    setButtonStatus('cancel');
    const response=await axios.put("http://localhost:5000/order/updateOrder",{orderId:delivery.orderId, status:'cancelled'},
        {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          }
    );
    const updatedOrders = orders.map((order) => {
        if (order._id === delivery.orderId) {
            return { ...order, status: 'cancelled' };
        }
        return order;
    });
    setOrders(updatedOrders);
    setClick(false);
    setButtonStatus();
}



const [rating, setRating] = useState(0)


const handleRating = (rate) => {
  setRating(rate)
  

  
}

const [comments, setComments]=useState('');

const handleChangeComment= (e)=>{
    setComments(e.target.value);
    console.log(comments);
   

}

const handleReviewSubmit= async(e) => {
    e.preventDefault();
    console.log(selectedReviewProduct ,rating, comments);
    if(selectedReviewProduct === null)
        alert('select product')
    else if(rating === 0)
        alert('give rating')
    else if(comments === '')
        alert('give comments')
    else{
        const response=await axios.put(`http://localhost:5000/products/addReview/${selectedReviewProduct}` ,{rating, comments},

            {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
              }
          )
          if(response){
            alert(response.data.message);
            setComments('');
            setSelectedReviewProduct(null);
            setRating(0);
          }
    }

}




const filteredProducts = filter === 'all' ? orders : orders.filter(order => order.status === filter);




  return (
   <div style={{paddingTop:"80px"}}> 
     <div className='d-flex justify-content-center'  style={{minHeight:"98%", position:"relative", background:filteredProducts.length == 0 ? 'white':null}}>
       <div ref={addressRef}></div>
        <div className='px-5 pb-5 d-flex flex-column align-items-center text-light '  style={{marginTop:"100px" , borderRadius:"15px", opacity: buttonStatus === 'cancel' ? '0.4' : '1'}}>
       
       
        {
            filteredProducts.length > 0 ? (
                <div>
                <div className='d-flex pb-4 justify-content-end w-100'>
                <Dropdown name="filter" className='mx-5' >
                          <Dropdown.Toggle variant="warning">
                          <FontAwesomeIcon icon={faFilter} /> Filter
                          </Dropdown.Toggle>
                          <Dropdown.Menu  className='bg-warning-subtle'>
                          <Dropdown.Item  onClick={() => {setFilter("all"); setClick(false)}} id='filter' value="all" >
                              all
                            </Dropdown.Item>
                            <Dropdown.Item  onClick={() => {setFilter("pending"); setClick(false)}} id='filter' value="pending" >
                              pending
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {setFilter("shipped"); setClick(false)}} id='filter' value="shipped">
                              shipped
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {setFilter("cancelled"); setClick(false)}} id='filter' value="cancelled">
                              cancelled
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {setFilter("delivered"); setClick(false)}} id='filter' value="delivered">
                              delivered
                            </Dropdown.Item>
                           
        
                          </Dropdown.Menu>
                        </Dropdown>
                
                
                </div>
                {filteredProducts.map((order, index)=>(
                    <div className='mb-4' key={index} onClick={() => handleAddressClick(order, addressRef)}>
                        <div className='d-flex flex-wrap justify-content-between mx-5 ms-5'>
                        <div className='text-dark'>Order Id : <span style={{color:"red"}}>{order._id}</span></div>
                   <div className='text-dark'> Status: <span style={{color:order.status === 'shipped' ? "#d79f04" :"red"}}>{order.status}</span></div>
                        </div>
                     <div className="grid-container p-3 border" id='cartItems' key={index} style={{borderRadius:"15px", boxShadow:"0 0 30px #0f061b", minWidth:"10rem", maxWidth:"60rem", cursor:"pointer"}}>
                    <div className="grid-item">S.No</div>
                    <div className="grid-item" style={{
                          maxWidth:"20rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>Product</div>
                    <div className="grid-item" style={{textAlign:"center"}}>Quantity</div>
                    <div className="grid-item" style={{textAlign:"center"}}>Price</div>
                  
                    {order.order.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="grid-item">{index + 1}</div>
                        <div className="grid-item" style={{
                          maxWidth:"20rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>{item.title}</div>
                        <div className="grid-item" style={{textAlign:"center"}}>{item.quantity}</div>
                        <div className="grid-item" style={{textAlign:"center"}}>${item.price}</div>
                        
                      </React.Fragment>
                      
                    ))}
                  <div className="grid-item "></div>
                  <div className="grid-item ">Total</div>
                       
                        <div className="grid-item" style={{textAlign:"center"}}>{order.totalQuantity}</div>
                        <div className="grid-item" style={{textAlign:"center"}}>${order.totalAmount}</div>
                     
                  
                  </div>
                  
                
                    </div>
                ))}
                </div>
            ) : (
                <div style={{width:"90vw"}}>
                     <div className='d-flex pb-4 justify-content-end'>
                <Dropdown name="filter" className='mx-5' >
                          <Dropdown.Toggle variant="warning">
                          <FontAwesomeIcon icon={faFilter} /> Filter
                          </Dropdown.Toggle>
                          <Dropdown.Menu  className='bg-warning-subtle'>
                          <Dropdown.Item  onClick={() => {setFilter("all"); setClick(false)}} id='filter' value="all" >
                              all
                            </Dropdown.Item>
                            <Dropdown.Item  onClick={() => {setFilter("pending"); setClick(false)}} id='filter' value="pending" >
                              pending
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {setFilter("shipped"); setClick(false)}} id='filter' value="shipped">
                              shipped
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {setFilter("cancelled"); setClick(false)}} id='filter' value="cancelled">
                              cancelled
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {setFilter("delivered"); setClick(false)}} id='filter' value="delivered">
                              delivered
                            </Dropdown.Item>
                           
        
                          </Dropdown.Menu>
                        </Dropdown>
                
                
                </div>


                <div className='d-flex justify-content-center align-items-center' style={{width:"100%", height:"50%", background:"white"}}>
        
        <img className='img-fluid'  src="/cartPage.webp" width={400} height={400} alt="emptyCart" />
         </div>
                </div>
               
            )
        }

    </div>

{
click ? (
    <div id='mobileView' style={{marginTop:"180px", flex:"1", minWidth:"10rem", maxWidth:"30rem", display:buttonStatus === 'cancel' ? "none": "block"}}>
       <div id='cartQuantity' className='d-flex flex-wrap justify-content-around align-items-center'>
       <div> Order Id: <span className='text-danger'>{delivery.orderId}</span></div>
       <div className='ms-3' style={{cursor:"pointer"}} onClick={() => setClick(false)}><button className='btn btn-danger'><FontAwesomeIcon icon={faArrowLeft} /> Back</button></div>
       </div>
       <div className='d-flex flex-column align-items-center justify-content-evenly' >
        {buttonStatus !== 'update' ? (
            <div>
                <div className=' mt-4' style={{fontSize:"22px", fontWeight:"500"}}>Delivery Address:</div>
        
        <div className='justify-content-center mt-3'>
    <div><span className='text-primary'>Name:</span> {delivery.name}</div>
    <div><div className='text-primary'>Address: </div>
    <div>{delivery.address},</div>
    <div>{delivery.city},</div>
    <div>{delivery.state}</div>
    <div>{delivery.pincode}</div>
    </div>
    <div><span className='text-primary'>Mobile: </span>{delivery.mobile}</div>
    <div><span className='text-primary'>Order Date: </span>{delivery.orderDate}</div>
        

    </div>
    
            </div>
            ):
         (<div className="pb-3 border mt-3" id='cartItems' style={{ borderRadius: "15px", boxShadow: "0 0 30px #0f061b", minWidth: "20rem", maxWidth: "30rem"}}>
    <form  className='d-flex flex-column align-items-center' onSubmit={handleSubmit} style={{width:"100%"}} >
          <div className='d-flex flex-column align-items-center' >
            <div className='mt-3 mb-4 text-light' style={{fontSize:"25px"}}>
              Delivery Address
            </div>
            <div>
            <input type="text" name='name' placeholder='Name' onChange={handleChange}  defaultValue={delivery.name} className='form-control mt-4'  />
              </div>
            <div>
            <input type="text" name='address' placeholder='Address' onChange={handleChange} defaultValue={delivery.address} className='form-control mt-4' />
              </div>
            <div>
            <input type="text" name='city' placeholder='City' onChange={handleChange} defaultValue={delivery.city} className='form-control mt-4' />
                </div>
            <div><input type="text" name='state' placeholder='State' onChange={handleChange} defaultValue={delivery.state} className='form-control mt-4' />
                
            </div>
            <div><input type="number" name='pincode' placeholder='Pincode' onChange={handleChange} defaultValue={delivery.pincode} className='form-control mt-4' />
               
            </div>
            <div>
              <input type="tel" name='mobile' placeholder='Mobile' onChange={handleChange} defaultValue={delivery.mobile} className='form-control mt-4'   />
          </div>
             <div className='mt-4 d-flex justify-content-evenly w-100'>
                <div> 
                    <input type="submit" id='updateAddressBtn' value="update"  className='btn btn-warning' />
                </div>
                <div><input type="button" id='cancelBtn' value="cancel" onClick={()=> {setButtonStatus(); setButton(delivery.status)}} className='btn btn-danger'/></div>
             </div>
          </div>
      </form>
  </div>)}
        <div className='d-flex mt-4 justify-content-evenly w-75' style={{display: button ? 'block' : 'none'}}>
            <div style={{display: button === 'pending' ? 'block' : 'none'}}>
                <button className='btn btn-success' onClick={()=> {setButtonStatus('update'); setButton()}}>Update</button>
            </div>
            <div className='ms-3' style={{display: button === 'pending' || button === 'shipped' ? 'block' : 'none'}}>
                <button className='btn btn-danger' onClick={()=>{setButtonStatus('cancel'); setButton()}}>Cancel</button>
            </div>
            <div className='ms-3' style={{display: button === 'delivered' ? 'block' : 'none'}}>
                <button className='btn btn-primary' onClick={()=> {setButtonStatus('delivered'); setButton()}}>Review</button>
            </div>
        </div>
       </div>
       
     </div>
):null

}
{
        buttonStatus === 'cancel' ? (
           <div className='bg-white' id='setOpacity' style={{position:'absolute', top:"50vh", left:"50%", transform:"translate(-50%,-50%)", padding:"50px", borderRadius:"15px", opacity:"1" }}>
            <div>
                Are you sure you want to cancel the order?
            </div>
            <div className='d-flex justify-content-evenly mt-3'>
                <div className='btn btn-warning me-3' id='orderPlaceBtn' style={{width:"6rem"}} onClick={()=> {setButtonStatus(''); setClick(false); setButton(delivery.status)
                }}>No</div>
                <div className='btn btn-danger' id='cancelBtn' style={{width:"6rem"}} onClick={()=> { handleCancelOrder() ;setClick(false)}}>Yes</div>
            </div>
           </div>
        ):null
    }

    {
        buttonStatus === 'delivered' ? (<div className='bg-white' id='setOpacity' style={{ position: 'absolute', top: "50vh", left: "50%", transform: "translate(-50%, -50%)", padding: "50px", borderRadius: "15px", opacity: "1" }}>
            <form onSubmit={handleReviewSubmit}>
              <div>
                Please provide a review for the product
              </div>
              <div className='mt-2 d-flex align-items-evenly'>
  {delivery.ordered_products.map((item, index) => (
    <div className='d-flex align-items-center' key={index}>
      <div className='me-3' id='radio-group'>
        <input type="radio" id={`option${index}`} name="option"
        value={item.productId}
        checked={ selectedReviewProduct === item.productId}
        onChange={handleOptionChange} />
        <label htmlFor={`option${index}`}>
          <img width={50} height={50} src={item.image} alt={`Option ${index}`} />
        </label>
      </div>
    </div>
  ))}
</div>

              <div className='mt-2 mb-2'>
               
                <div className='mt-2'>
                  <Rating onClick={handleRating} value={rating}/>
                </div>
                <div className='mt-2'>
                  <textarea
                    type="text"
                    value={comments}
                    className='p-3'
                    placeholder='Describe your experience'
                    onChange={handleChangeComment}
                    style={{ borderRadius: "15px", minWidth: "90%", maxWidth: "100%", height: "8rem" }}
                    name="comments"
                    
                  />
                </div>
              </div>
              <div className='d-flex justify-content-evenly mt-3'>
                <div className='btn btn-warning me-3' id='orderPlaceBtn' style={{ width: "6rem" }} onClick={() => { setButtonStatus(''); setClick(false); setButton(delivery.status) }}>
                  Close
                </div>
                <button className='btn btn-danger' type='submit' id='cancelBtn' style={{ width: "6rem" }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
           
        ):null
    }

    </div>
   </div>
  )

}
export default Orders