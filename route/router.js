const express=require('express')

const router=express.Router()

const {addBook,editBook,deleteBook,userLogin,userRegin,pswReset,listBooks,searchName,searchCategory,searchAuth}=require('../controllers/logic')

// book api
router.get('/booklist',listBooks)

router.post('/add-book',addBook)

router.post('/edit-book',editBook)

router.post('/delete-book',deleteBook)


// book search api
router.post('/sname',searchName)
router.post('/syear',searchYear)
router.post('/scat',searchCategory)
router.post('/sauth',searchAuth)


// user api

router.post('/signup',userRegin)

router.post('/login',userLogin)

router.post('/reset-password',pswReset)



module.exports=router