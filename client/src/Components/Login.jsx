import React, { useEffect } from "react";

import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom";
import { useRef } from "react";
import { Alert } from "@mui/material";





function Login({setData}) {
  const initalValue = { email: "", password: "" };
  const [values, setValues] = useState({ ...initalValue });
  const [errors, setError] = useState(initalValue);
  // const [isSubmit, setIsSubmit] = useState(false);
  const isSubmit=useRef(false);
  const route=useRef(false);


  useEffect(()=>{
  console.log(values);
  },[route])





  const handleChange = (event) => {
    const { name, value } = event;
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const onSubmit = () => {
    isSubmit.current=true
    validate();
    if(isSubmit){
      LoginUser();
    }

  };

  const validate = () => {
    
    setError((err) => ({
      ...err,
      email: `${values.email ? "" : "Please Enter a email"}`,
    }));
    setError((err) => ({
      ...err,
      password: `${values.password ? "" : "Please Enter  password"}`,
    }));
    for(let val of Object.values(errors)){
      if(val===""){
        isSubmit.current=true;
      }
      else{
        isSubmit.current=false;
      }
     }
   
  };

  

  const LoginUser = async () => {
    console.log("Button clicked")
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try{
      const response = await axios.post("https://loginpageppt.herokuapp.com/api/login",{values}, config)
      if(response.status===200){
        console.log("Successful");
        route.current=true;
        
        console.log(route);
        setError((err)=>({...err,email:"",password:""}))
        setData(response);
       
      }
      
    }
  
    catch(e){
    
  
      if(e.response.status===404){
        setError((err)=>({...err,email:"User Doesn't Exist"}))

      }
      if(e.response.status===400){
        setError((err)=>({...err,password:"Incorrect Password"}))
      };
      
    }

  };



  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          className="w-full py-1 px-1 border border-slate-700"
          onChange={(e)=>handleChange(e.target)}
        ></input>
             <p className='text-sm text-red-900'>{errors.email}</p>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="off"
          name="password"
          className="w-full py-1 px-1 border border-slate-700" 
          onChange={(e)=>handleChange(e.target)}
          ></input>
             <p className='text-sm text-red-900'>{errors.password}</p>

      </div>
      <div className="w-full text-center border border-sky-700 p-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:text-black" onClick={()=>{onSubmit()}}>
       <Link to={`${route.current? `/profile`:"/"}`}>
        <button type="submit">Login</button>
        </Link>
        
      </div>
      {route.current && <Alert severity="success">{"Login Succesfull Click to Continue"}</Alert>}
      
    </>
  );
}

export default Login;

