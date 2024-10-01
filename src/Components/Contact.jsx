import axios from 'axios';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons"

import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components';



const ImageDiv= styled.div`

    @media (max-width: 1050px) {
        display: none;
    }
`

const Contact = () => {
  const [dropdown, setDropdown] = useState('select');
  const [formData, setFormData] = useState({
    category: "",
    query: ""
  })


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (dropdown === 'select') {
      alert('Please select the type of qurey')
    }
    else if (formData.query === "") {
      alert('Please describe about your query')
    }
    else {
      formData.category = dropdown;
      
      axios.post("http://localhost:5000/user/query", {category:formData.category, query:formData.query}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
        .then((res) => {
          alert(`${res.data.message}`);
          setDropdown("select");
          setFormData({ category: "", query: "" })
          

        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
   <div className='d-flex' style={{paddingTop:"80px"}}>

<div className='d-flex justify-content-center ' id='contact' style={{height:"88vh", paddingTop:"30px", flex:"1", paddingBottom:"30px"}}>
      <form   style={{maxWidth:"80vw"}}>

        <div className='p-5 bg-secondary-subtle' style={{ height: "auto",minWidth: "30vw" , maxWidth: "30rem", borderRadius: "15px", boxShadow:"0 0 20px " }}>
          <div className='text-center'>
            <FontAwesomeIcon color='#f65400' fontSize={"5rem"} icon={faEnvelopeOpenText} />
            </div>
          <div className='text-center mt-3'><h3>Contact Us</h3></div>

          <div className='mb-3 d-flex'>
            <div className='mt-5'><label>Select your query's category</label></div>
            <div className='mt-5 ms-4'><Dropdown name="Issues" >
              <Dropdown.Toggle variant="warning">
                {dropdown}
              </Dropdown.Toggle>
              <Dropdown.Menu >
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Order Inqueries")} value="Order Inqueries" >
                  Order Inqueries
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Shipping and Delivery")} value="Shipping and Delivery">
                  Shipping and Delivery
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Returns and Refunds")} value="Returns and Refunds">
                  Returns and Refunds
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Product Information")} value="Product Information">
                  Product Information
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Account Management")} value="Account Management">
                  Account Management
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Payment Issues")} value="Payment Issues">
                  Payment Issues
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Technical Support")} value="Technical Support">
                 technical Support
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("General Inqueries")} value="General Inqueries">
                  general Inqueries
                </Dropdown.Item>
                <Dropdown.Item id='drawer' onClick={() => setDropdown("Others")} value="Others">
                  Other
                </Dropdown.Item>


              </Dropdown.Menu>
            </Dropdown></div>

          </div>
          <div >
            <div className='mb-3'>
              <label > Describe Your query</label>
            </div>
            <div >
              <textarea type="text" value={formData.query} className='p-3' placeholder='Describe your query here' onChange={handleChange} style={{ borderRadius: "15px",minWidth:"90%",maxWidth: "100%", height: "8rem" }} name="query" required></textarea>
            </div>
          </div>


          <div className='text-center mt-4 '><button type='submit' className='btn btn-warning' onClick={handleSubmit}>submit</button></div>

        </div>

      </form>
      
    </div>
  <ImageDiv>
    <img src="/contactUs.jpg" alt="contact" style={{minHeight:"88vh",width:"600px", backgroundAttachment:"fixed", backgroundSize:"cover"}} />
    </ImageDiv>
  
  </div>

  
  )
}

export default Contact