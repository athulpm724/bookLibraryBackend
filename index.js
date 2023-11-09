const express=require('express')
require('dotenv').config()
const server=express()
const router=require('./route/router')
//port variable
const port=process.env.port || 2501
const cors=require('cors')


require('./db/connection')
server.use(cors())
server.use(express.json())
server.use(router)
server.listen(port,()=>{
    console.log(`SERVER WORKING @${port}`);
})