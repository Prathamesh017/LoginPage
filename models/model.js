import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    
})
// module.exports=moongoose.model("User",userSchema);
export default mongoose.model("User",userSchema);