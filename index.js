import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import connectDB from "./config/database.js";

const app=express();


app.use(express.json());


dotenv.config({path:"./config/config.env"});
connectDB();


app.use("/",router);
app.listen(5000,()=>{
    console.log("Server Is Listening");
})