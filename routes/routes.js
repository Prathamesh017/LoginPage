import express from "express"
import { registerUser,getAllusers ,loginUser,getUser,updateUser} from "../controllers/userControllers.js";
const router=express.Router();



router.route("/register").get(getAllusers).post(registerUser);
router.route("/login").post(loginUser);
router.route("/user").post(getUser);
router.route("/userUpdate").post(updateUser)


export default router