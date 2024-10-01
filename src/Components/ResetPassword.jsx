import axios from "axios";
import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const params = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        resetPassword();
    }

    const resetPassword = async () => {
        const email = params.email;
        const response = await axios.put("https://day41taskbe-1.onrender.com/user/resetPassword", { email, password });
        alert(response.data.message);
        if (response.data.message === "Password Changed successfully") {
            navigate('/');
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center' id="passwordReset" style={{ width: "100vw", height:"100vh" }}>
            <form className='border border-5 p-5' onSubmit={handleSubmit} style={{ borderRadius: "25px" }}>
                <h1 className="text-center text-light">Reset Password</h1>
                <div className="passwordDiv mt-5">
                    <label className="text-light">New password:</label>
                    <input className="form-control mt-3" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {errors.length && <p className="text-danger">{errors.length}</p>}
                    {errors.uppercase && <p className="text-danger">{errors.uppercase}</p>}
                    {errors.lowercase && <p className="text-danger">{errors.lowercase}</p>}
                    {errors.number && <p className="text-danger">{errors.number}</p>}
                    {errors.specialChar && <p className="text-danger">{errors.specialChar}</p>}
                </div>
                <div className="passwordDiv mt-3">
                    <label className="text-light">Confirm password:</label>
                    <input className="form-control mt-3" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="text-center mt-5">
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword;
