import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useRef } from "react";

function Signup() {
  const initalValue = { name: "", email: "", password: "", cpassword: "" };
  const [values, setValues] = useState(initalValue);
  const [errors, setError] = useState(initalValue);
  const isSubmit = useRef(false);
  const [alert, setAlert] = useState({
    setalert: false,
    color: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event;
    // console.log(value);
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(values);
  }, [values]);

  const onSubmit = () => {
    console.log("Hello");
    validate();
    if (isSubmit) {
      console.log("iS Submit");
      registerUser();
    }
  };

  const validate = () => {
    console.log("Inside Validate");
    setError((err) => ({
      ...err,
      name: `${values.name ? "" : "Please Enter a Name"}`,
    }));
    setError((err) => ({
      ...err,
      email: `${values.email ? "" : "Please Enter a email"}`,
    }));
    setError((err) => ({
      ...err,
      password: `${values.password ? "" : "Please Enter a password"}`,
    }));
    setError((err) => ({
      ...err,
      cpassword: `${values.cpassword ? "" : "Please Enter a confirm password"}`,
    }));

    
    if (!values.email.includes("@")) {
      setError((err) => ({ ...err, email: "Please Enter a Valid  Email" }));
    }
    else{
      setError((err) => ({ ...err, email: "" }));
    }
    if (values.password !== values.cpassword) {
      setError((err) => ({ ...err, cpassword: "Password Not Matching" }));
    }
    else{
      setError((err) => ({ ...err, cpassword: "" }));
    }

    for (let val of Object.values(errors)) {
      if (val === "") {
        isSubmit.current = true;
      } else {
        isSubmit.current = false;
      }

      console.log(isSubmit);
    }
  };

  const registerUser = async () => {
    console.log("Hello register");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post("/api/register", { values }, config);

    console.log(response);
    if (response.data.result === "User Already Exist") {
      setAlert({
        setalert: true,
        message: "User Already Exist",
        color: "error",
      });
    }
    if (response.data.result === "User Created Successfully") {
      setAlert({
        setalert: true,
        message: "User Created Successfully",
        color: "success",
      });
    }
  };

  return (
    <>
      <div>
        <h3>Name</h3>
        <input
          type="text"
          onChange={(e) => handleChange(e.target)}
          name="name"
          autoComplete="off"
          placeholder="enter name"
          className="w-full py-1 px-1 border border-slate-700"
        ></input>
        <p className="text-sm text-red-900">{errors.name}</p>
      </div>
      <div>
        <h3>email</h3>
        <input
          type="text"
          onChange={(e) => handleChange(e.target)}
          name="email"
          autoComplete="off"
          placeholder="enter email"
          className="w-full py-1 px-1 border border-slate-700"
        ></input>
        <p className="text-sm text-red-900">{errors.email}</p>
      </div>
      <div>
        <h3>password</h3>
        <input
          type="text"
          onChange={(e) => handleChange(e.target)}
          name="password"
          autoComplete="off"
          placeholder="enter password"
          className="w-full py-1 px-1 border border-slate-700"
        ></input>
        <p className="text-sm text-red-900">{errors.password}</p>
      </div>
      <div>
        <h3>confirm password</h3>
        <input
          type="text"
          onChange={(e) => handleChange(e.target)}
          name="cpassword"
          autoComplete="off"
          placeholder="enter confirm password"
          className="w-full py-1 px-1 border border-slate-700"
        ></input>
        <p className="text-sm text-red-900">{errors.cpassword}</p>
      </div>
      <div
        className="w-full text-center border border-sky-700 p-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:text-black"
        onClick={() => {
          onSubmit();
        }}
      >
        <button type="submit">Sign UP</button>
      </div>
      {alert.setalert && <Alert severity={alert.color}>{alert.message}</Alert>}
    </>
  );
}

export default Signup;
