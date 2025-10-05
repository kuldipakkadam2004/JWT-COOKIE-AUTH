const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
require("dotenv").config();
const {dbConnect}=require("./config/db");
const app = express();
app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use("/api",authRoutes);
app.use("/api",profileRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server running on PORT ${process.env.PORT}`);
})
