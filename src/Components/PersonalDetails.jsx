import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PersonalDetails = () => {
        const [edit,setEdit]=useState(false);
        const [personalInfo, setPersonalInfo]=useState({
            name:"",
            email:"",
            mobile:"",
            gender:"",
            dob:""
        
        })
        useEffect(()=>{
            const fetchData=()=>{
                const personalInfos=axios.get("https://e-commerce-be-828a.onrender.com/user/getPersonalInfo",{
                    headers:{
                        Authorization:`Bearer ${sessionStorage.getItem("token")}`
                    }
                }).then((response)=>{
                    setPersonalInfo(response.data.user)
                })
            }
            fetchData();
            
        },[])

       
       
        const handleSubmit=(e)=>{
            e.preventDefault();
            console.log(personalInfo);
            const updateInfo= async()=>{
            const response=await axios.put("https://e-commerce-be-828a.onrender.com/user/updatePersonalInfo",{personalInfo},
                {
                    headers:{
                        Authorization:`Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            )
        }
        updateInfo();

        }

  return (
    <div style={{paddingTop:"100px"}}>
        <div className='d-flex justify-content-center' style={{height:"88vh" }}>
        <form onSubmit={handleSubmit}>
        <div className='d-flex flex-column mt-5 align-items-center ' style={{width:"20rem"}}>
        <div>Personal Information</div>
        <div className='d-flex justify-content-between w-100 mt-3'>
            <div><label> Name :</label></div>
            <div><input className='form-control' defaultValue={personalInfo.name} onChange={(e)=>setPersonalInfo({...personalInfo,name:e.target.value})} type="text" disabled={!edit}/></div>
        </div>
        <div className='d-flex justify-content-between w-100 mt-3'>
        <div> <label> Email :</label></div>
        <div> <input className='form-control' defaultValue={personalInfo.email} onChange={(e)=>setPersonalInfo({...personalInfo, email:e.target.value})}  type="email" disabled={!edit}/></div>
        </div>
        <div className='d-flex justify-content-between w-100 mt-3'>
        <div> <label> Mobile :</label></div>
        <div> <input className='form-control' defaultValue={personalInfo.mobile}  onChange={(e)=>setPersonalInfo({...personalInfo, mobile:e.target.value})} type="tel"  disabled={!edit}/></div>
        </div>
        <div className='d-flex justify-content-between w-100 mt-4 mb-1'>
        <div> <label>gender :</label></div>
        <div> <input  type="radio" name='gender' checked={personalInfo.gender === 'male'}  value='male' onChange={(e) => setPersonalInfo({...personalInfo, gender:e.target.value})} required disabled={!edit}/>Male
            <input className='mx-2' type="radio" checked={personalInfo.gender === 'female'} name='gender'  value='female' onChange={(e) => setPersonalInfo({...personalInfo, gender:e.target.value})} required disabled={!edit}/>Female
            <input className='mx-2' type="radio" name='gender' value='other' checked={personalInfo.gender === 'other'} onChange={(e) => setPersonalInfo({...personalInfo, gender:e.target.value})} required disabled={!edit}/>Other</div>
        </div>
        <div className='d-flex justify-content-between w-100 mt-3 mb-4'>
        <div><label>DOB :</label></div>
        <div > <input className='form-control' defaultValue={personalInfo.dob} onChange={(e)=>setPersonalInfo({...personalInfo, dob:e.target.value})} type="date" disabled={!edit}/></div>
        </div>

        <div className='d-flex justify-content-evenly w-75'>
            <div><button className='btn btn-warning' type='button' onClick={()=>setEdit(!edit)} style={{width:"5rem"}}>Edit</button></div>
            <div><button className='btn btn-success' type='submit' style={{width:"5rem"}} disabled={!edit}>Save</button></div>
        </div>


     
       
    </div>
        </form>
    </div>
    </div>
  )
}

export default PersonalDetails