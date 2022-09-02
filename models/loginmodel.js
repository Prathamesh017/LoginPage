import mongoose from "mongoose";

const loginSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    age:{
        type:String,
    },
    DOB:{
      type:Date
    },
    mobile_no:{
       type:String,
    },
    Gender:{
        type:String
    }
})
// module.exports=moongoose.model("User",userSchema);
export default mongoose.model("Loginuser",loginSchema);