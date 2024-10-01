import  axios  from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    
     const handleSubmit=(e)=>{
        e.preventDefault();
         loginUser();
    }
    const navigate=useNavigate();
  
   


    const handleClick=()=>{
        navigate("/register");

    }
    const loginUser=async()=>{
      try {
     
        const response=await axios.post("https://e-commerce-be-828a.onrender.com/user/login",{email,password});
        if(response.data.message === "Login successful"){
         
          
         sessionStorage.setItem('token',response.data.token  );
          alert("Login successful");
          navigate("/App");
        }
        if(response.data.message === "Email not found"){
          alert("Email not found");
        }
        if(response.data.message === "Invalid credentials"){
          alert("Invalid credentials");
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
 
    <div className='d-flex flex-column justify-content-center align-items-center' id='loginPage' style={{width:"100vw", height:"100vh" }}>
        <form className='border border-5 p-5' onSubmit={handleSubmit} style={{borderRadius:"25px"}}>
            <h1 className='text-center text-light'>LOGIN PAGE</h1>
            <div className="emailDiv mt-5">
                <label className='text-light' >email:</label>
                <input className="form-control" type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            </div>
            <div className="passwordDiv mt-5">
                <label className='text-light'>password:</label>
                <input className="form-control" type="password"  name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            </div>
            <div className="mt-5 ">
                <Link className='text-light' to="/resetpassword" >forgot Password?</Link>
              </div>
            <div className="d-flex justify-content-evenly mt-5">
              
            <div><button className='btn btn-primary' type='submit'>Submit</button>
            </div>
            <div><button className="btn btn-primary" type='button' onClick={handleClick}>Register</button></div>
       
            </div>
        </form>
         </div>
  )
}

export default Login