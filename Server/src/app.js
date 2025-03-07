require('dotenv').config()
const express =require('express')
const app=express()
const airoutes=require('./routes/ai.routes')
app.use(express.json())

const cors = require("cors");

app.use(cors({
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST"],
      credentials: true
}));

app.get('/',(req,res)=>{
      res.send('hi there')
})
app.use('/ai',airoutes)

module.exports=app