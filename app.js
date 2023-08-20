require('dotenv').config()
const {PORT,MONGO_URI}=require('./config/configVariables')
const mongoose = require('mongoose')
const express = require('express')
var cookieParser = require('cookie-parser');

//const varifyJWT  = require('./middlewares/verifyJWT');

const authRoutes = require ('./routes/auth')
const categoryRoutes = require ('./routes/category')
const customerRoutes = require ('./routes/customer')
const productRoutes = require ('./routes/product')
const orderRoutes = require ('./routes/order');
const errorHandler = require('./middlewares/errorHandler');
const ApiError=require('./helpers/ApiError')

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

app.all('*',(req,res,next)=>{
    next(new ApiError(`${req.originalUrl} Not Found`,400))
})

//middleware
app.use(errorHandler)

mongoose.connect(MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(PORT,()=>{
        console.log('connected to db & listening on port ',PORT)
        })

    })
    .catch((error)=>{
        console.log(error)
    })
