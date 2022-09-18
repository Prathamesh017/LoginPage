 import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        // trying to making connection with Database;
    
    const conn=await mongoose.connect(process.env.MONGO);
       console.log(`Database Connected `);
    }
    catch(e){
          console.log("message"+e.message);
          process.exit(1);

    }

}
export default connectDB;