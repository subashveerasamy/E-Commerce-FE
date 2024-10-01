import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      errors.number = "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.specialChar = "Password must contain at least one special character.";
    }
    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    userRegister();
  }

  const handleClick = () => {
    navigate("/");
  }
  
  const userRegister = async () => {
   try {
    const response = await axios.post("https://e-commerce-be-828a.onrender.com/user/register", { username, email, password });
    console.log(response.data.message);
    if (response.data.message === "User registered successfully") {
      navigate("/");
    } else if (response.data.message === "Email Already Exists") {
      alert("Email Already Exists");
    } else if (response.data.message === "Username Already Exists") {
      alert("Username Already Exists");
    }
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className='d-flex pt-5 flex-column justify-content-center align-items-center' id='registerPage' style={{ width: "100vw", height:"100vh" }}>
      <form className='border border-5 p-5 mb-3' style={{ borderRadius: "25px" }} onSubmit={handleSubmit}>
        <h1 className='text-light'>Register Page</h1>
        <div className='mt-5'>
          <label className='text-light'>Username:</label>
          <input className='form-control' type="text" value={username} name='username' onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='mt-4'>
          <label className='text-light'>Email:</label>
          <input className='form-control' type="email" value={email} name='email' onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='mt-4'>
          <label className='text-light'>Password:</label>
          <input className='form-control' type="password" value={password} name='password' onChange={(e) => setPassword(e.target.value)} required />
          {errors.length && <p className="text-danger">{errors.length}</p>}
          {errors.uppercase && <p className="text-danger">{errors.uppercase}</p>}
          {errors.lowercase && <p className="text-danger">{errors.lowercase}</p>}
          {errors.number && <p className="text-danger">{errors.number}</p>}
          {errors.specialChar && <p className="text-danger">{errors.specialChar}</p>}
        </div>
        <div className='mt-4'>
          <label className='text-light'>Confirm Password:</label>
          <input className='form-control' type="password" value={confirmPassword} name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="d-flex justify-content-evenly mt-5">
          <div>
            <button className='btn btn-primary' type='submit'>Submit</button>
          </div>
          <div>
            <button className="btn btn-primary" type='button' onClick={handleClick}>Login</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register;
