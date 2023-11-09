const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    email:String,
    psw:String
})

const adminSchema=mongoose.Schema({
    id:String,
    psw:String
})

const bookSchema=mongoose.Schema({
    id:String,
    bname:String,
    title:String,
    author:String,
    pyear:String,
    category:[],
    rating:String,
    view:String
})

const users=new mongoose.model('users',userSchema)
const admins=new mongoose.model('admins',adminSchema)
const books=new mongoose.model('books',bookSchema)

module.exports={users,admins,books}