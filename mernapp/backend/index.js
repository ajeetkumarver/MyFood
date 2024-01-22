const express = require('express')
const app = express()
const mongoDb=require('./db');
const dotenv = require("dotenv").config();
const port = process.env.PORT

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Resquested-With, Content-Type,Accept"
  )
  next();
})


mongoDb();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))
app.use('/api', require("./Routes/Payment"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})