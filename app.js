require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
var cookieParser = require('cookie-parser');

//const varifyJWT  = require('./middlewares/verifyJWT');

const authRoutes = require ('./routes/auth')
const categoryRoutes = require ('./routes/category')
const customerRoutes = require ('./routes/customer')
const productRoutes = require ('./routes/product')
const orderRoutes = require ('./routes/order')

//express app
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

//routes
app.use('/auth',authRoutes)
app.use('/categories',categoryRoutes)
app.use('/customers',customerRoutes)
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT,()=>{
        console.log('connected to db & listening on port ',process.env.PORT)
        })

    })
    .catch((error)=>{
        console.log(error)
    })
