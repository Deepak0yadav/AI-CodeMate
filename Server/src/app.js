require('dotenv').config()
const express =require('express')
const app=express()
const airoutes=require('./routes/ai.routes')
const cors=require('cors')
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
      res.send('hi there')
})
app.use('/ai',airoutes)

module.exports=app