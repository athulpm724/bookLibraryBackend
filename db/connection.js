const mongoose=require('mongoose')
const url=process.env.db_url

mongoose.connect(url,{
    // useNewUrlParser:true
}).then(()=>{
    console.log('MONGODB CONNECTED!');
}).catch(()=>{
    console.log("CONNECTION FAILED!");
})