const express = require('express')
const app = express()
const port = 5001
const mongoDb=require('./db');

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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})