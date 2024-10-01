import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage1 = () => {
    const [email, setEmail]=useState('');
    const navigate=useNavigate();
    
    const [message, setMessage]=useState('');
    
    const handleSubmit=(e)=>{
        
        e.preventDefault();
        checkuser();
       
        
       
        
       
       // navigate(`/resetpassword/${email}`);
        
    
}

const checkuser = async()=>{
    const response = await axios.get(`https://e-commerce-be-828a.onrender.com/user/checkUser/${email}`)
   if(response.data.message === "Email found"){
    setMessage(response.data.message);
    navigate(`/resetpassword/${email}`);
   }
   if(response.data.message ==="Email not found"){
    alert("Email not found");
   }
    
}
   
  return (
    <div className='d-flex justify-content-center align-items-center' id='passwordReset' style={{width:"100vw", height:"100vh"}}>
    <form className='border border-5 p-5' onSubmit={handleSubmit} style={{borderRadius:"25px"}}>
        <h1 className="text-center text-light">Reset Password</h1>
        <div className="emailDiv mt-5">
            <label className='text-light'>Email:</label>
            <input className="form-control mt-3" type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
        </div>
        
       <div className="text-center mt-5"> <button className="btn btn-primary" type='submit'>Submit</button></div>
    </form>
</div>
  )
}

export default ResetPasswordPage1