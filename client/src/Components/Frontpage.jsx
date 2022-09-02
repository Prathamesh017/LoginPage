import React from 'react'
import Login from './Login';
import Signup from "./Signup"
import { useState } from 'react';
function Frontpage() {
const [colors,setColors]=useState(true);
  return (
    <>
     <div className='text-4xl font-bold'>
          <h1>Login Form</h1>
        </div>
        <div className='w-100% flex justify-between border border-sky-700'>
            <div className={`grow ${colors?"bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white":""}`}>
            <button onClick={()=>{setColors(true)}} className="w-full h-full p-2">Login</button>
            </div>
            <div className={`grow ${colors? "":"bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"}`}>
            <button onClick={()=>{setColors(false)}}  className="w-full h-full p-2">SignUp</button>
            </div>
        </div>

               {
                colors ? <Login></Login>: <Signup></Signup>
               }  
    </>
  )
}

export default Frontpage