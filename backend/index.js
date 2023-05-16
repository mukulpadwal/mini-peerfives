const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const userRouter = require("./Routes/User");
const mongoConnect = require("./mongooseConnect");

mongoConnect();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Alloeing the cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next(); 
  });

// Routes
app.use("/api", userRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});