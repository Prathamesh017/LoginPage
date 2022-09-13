import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import connectDB from "./config/database.js";
import path from "path";
const app = express();

app.use(express.json());

dotenv.config({ path: "./config/config.env" });
connectDB();

console.log(process.env.NODE_ENV);
//-----------------deployment----------------
// const paths=path.join(__dirname);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
else{
  app.use("/api", router);
 }


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Is Listening");
});
