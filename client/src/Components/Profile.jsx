import React, { useState ,useRef} from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
function Profile({ data }) {
  const [values, setValues] = useState({
    email: "",
    age: "",
    dob: "",
    mobile: "",
    gender: "",
  });
  const updated=useRef(false);
  const [update,setUpdate]=useState(false);

  useEffect(() => {
    if (data) {
      getDataOfUser();
    }
  }, []);

  const setDate=(dates)=>{
  const date=new Date(dates);
  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? '0'+ (date.getMonth()+1) : (date.getMonth()+1)
  const day =  date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
  const d= (year+"-" +month+"-" +day);
  return d;
  }
  const getDataOfUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/api/user", { data }, config);
      console.log(response.data.user);
      const { age, DOB, Gender, mobile_no, email } = response.data.user;

      console.log("date is" + DOB);

      setValues((prev) => ({
        ...prev,
        age: age,
        dob: setDate(DOB),
        gender: Gender,
        mobile: mobile_no,
        email: email,
      }));
    } catch (e) {
      console.log(e);
    }
  };
  const UpdateData = async () => {
    const { age, mobile, dob, gender } = values;
 

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/api/userUpdate", { values }, config);
      setUpdate(true);
      console.log(response);
      setTimeout(()=>{
       setUpdate(false);
      },5000)
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event;
 
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
   
  };
  return (
    <>
      <div className="w-screen h-screen bg-[#fa4299] bg-[#fa4299] flex justify-center  items-start  md:items-center ">
        <div className="card bg-white  p-10  space-y-6 w-[400px] mt-10 md:mt-0">
          <div className="text-4xl font-bold">
            <h1>Profile Page </h1>
          </div>
          {/* <div className='w-100% flex justify-between border border-sky-700'> */}
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="age"
              placeholder="Enter age"
              autoComplete="off"
              name="age"
              value={values.age}
              onChange={(e) => {
                handleChange(e.target);
              }}
              className="w-full py-1 px-1 border border-slate-700"
            ></input>
          </div>

          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              placeholder="Enter Date of Birth"
              autoComplete="off"
              name="dob"
              // defaultValue={`2022-9-9`}
              value={values.dob}
              onChange={(e) => {
                handleChange(e.target);
              }}
              className="w-full py-1 px-1 border border-slate-700"
            ></input>
          </div>

          <div>
            <label htmlFor="gender">Gender</label>
            <input
              type="string"
              placeholder="Enter gender"
              autoComplete="off"
              name="gender"
              value={values.gender}
              onChange={(e) => {
                handleChange(e.target);
              }}
              className="w-full py-1 px-1 border border-slate-700"
            ></input>
          </div>

          <div>
            <label htmlFor="mobile">Mobile</label>
            <input
              type="number"
              placeholder="Enter Mobile Number"
              autoComplete="off"
              name="mobile"
              value={values.mobile}

              onChange={(e) => {
                handleChange(e.target);
              }}
              className="w-full py-1 px-1 border border-slate-700"
            ></input>
          </div>

          <div
            className="w-full text-center flex flex-col space-y-2 border border-sky-700 p-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:text-black"
            onClick={() => {}}
          >
            <button
              type="submit"
              onClick={() => {
                UpdateData();
              }}
            >
              Submit Data
            </button>
           
          </div>


          <div
            className="w-full text-center flex flex-col space-y-2 border border-sky-700 p-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:text-black"
            onClick={() => {}}
          >
            <Link to="/">
            <button
              type="submit"
              onClick={() => {
                UpdateData();
              }}
              >
              Logout
            </button>
              </Link>
            
           
          </div>
              {update && <Alert severity="success">{"User Updated"}</Alert>}
        </div>
      </div>
    </>
  );
}

export default Profile;
