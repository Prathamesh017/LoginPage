import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from "./Components/Background"
import Profile from "./Components/Profile"

export default function App() {
const [data,setData]=useState("");
  return (
<>
<BrowserRouter>
<Routes>
        <Route  path="/" element={<Background data={data}  setData={setData}/>}/>
        <Route path="/profile" element={<Profile  data={data} />}/>
</Routes>  
</BrowserRouter> 
</>
  )
}