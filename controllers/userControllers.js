// import user from "./"
import User from "../models/model.js";
import SignedUser from "../models/loginmodel.js";

// get all users
// get request with /register
export const getAllusers=async(req,res)=>{
    const allusers=await User.find();
    if(allusers){
        res.status(200).json({
            result:"success",
            data:allusers
        })
    }

}

// export const getAllusers=async(req,res)=>{
//     const allusers=await User.find();
//     if(allusers){
//         res.status(200).json({
//             result:"success",
//             data:allusers
//         })
//     }

// }


// register a user
// Post request with /register
export const registerUser=async (req,res,next)=>{
    console.log("Successful Request");
  
    const {name,email,password}=req.body.values || req.body;

    console.log(name,email,password);
    // checking is user already exist or not
    const userExist=await User.findOne({email});

    if(userExist){
        res.json({result:"User Already Exist"});
        return;
    }
    // // if not then
    const user=await User.create({
        name,
        email,
        password,
       
       
    })
    console.log(user);
    if(user){
        res.status(201).json({
            result:"User Created Successfully",
            id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
          
            

        })
    }
    
}


// login user only if user is already sign up
// post request with /login 

export const loginUser=async (req,res,next)=>{
    //  console.log(req.body.values);
    const {email,password}=req.body.values;
     console.log(email,password);
     const userExist=await User.findOne({email});
     console.log(userExist);
     if(!userExist){
        console.log("No User Found");
        res.status(404).json({
            result:"failure",
            message:"No User Found"
        })
       
     }
     if(userExist && password!==userExist.password){
        res.status(400).json({
            result:"failure",
            message:"Invalid Password"
        })
     }
     if(userExist && password===userExist.password){
        // console.log(password===userExist.password);
        res.status(200).json({
            result:"success",
            message:"User Exist",
            id:userExist._id,
            name:userExist.name,
            email:userExist.email,
            password:userExist.password
        
        })

        
       
     }
}


// 
export const getUser=async (req,res,next)=>{
   
    // console.log(req.body.body.data);
  const {name,email}=req.body.data.data;
  console.log(name,email);
  
//   // checking is user already exist or not
  const userExist=await SignedUser.findOne({email});
  
 
  if(userExist){
     console.log('User Already Exist');
     res.status(200).json({
        result:"Succcess",
        message:"User Already Exists",
        user:userExist
     })
   
  }
  else{
  console.log('New User Exist');

  const user=await SignedUser.create({
    name,
    email,
    age:null,
    dob:null,
    mobile_no:"",
    Gender:""
})

if(user){
    res.status(201).json({
        result:"success",
        message:"user Logged in",
        user,
    })
}
else{
    res.status(400).json({
        result:"failure",
        message:"user not logged in"
    })
}
  
  }
}

export const updateUser=async(req,res,next)=>{
console.log("Udate");
   const {email,age,dob,mobile,gender}=req.body.values;
   console.log(mobile);
const findUser=await SignedUser.findOne({email})


const some=await  SignedUser.findOneAndUpdate({email:email} ,{age:age});
const some2=await  SignedUser.findOneAndUpdate({email:email} ,{DOB:dob});
const some3=await  SignedUser.findOneAndUpdate({email:email} ,{mobile_no:mobile});
const some4=await  SignedUser.findOneAndUpdate({email:email} ,{Gender:gender});

res.status(200).json({
    result:"success",
    message:"User Succesfully Updated"
})
//   console.log(findUser);
}

