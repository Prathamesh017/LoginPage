import React from 'react'
import { useState } from 'react'
import Login from './Login';
import Signup from './Signup';
function Background({data,setData}) {
const [colors,setColors]=useState(true);



  return (
    <div className='w-screen h-screen bg-[#fa4299] bg-[#fa4299] flex justify-center  items-start  md:items-center '>
      <div className='card bg-white  p-10  space-y-6 w-[400px] mt-10 md:mt-0'>
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
                colors ? <Login setData={setData} ></Login>: <Signup></Signup>
               }  
        
        
      </div>
    </div>
  )
}

export default Background