import express from 'express'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import cors from 'cors'
import corsOption from './config/corsOption.js'
import connectDB from './config/dbConfig.js'
import cookieParser from 'cookie-parser'
const app=express()

connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOption))

//importing the other routes of the server 
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/menu', menuRoutes)

//to check if server running properly 
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' })); 
app.get('/', (req, res)=>{
    res.status(200).json({success:true, msg:"all good"})
})


//Server on port 
app.listen((process.env.PORT || 5000), ()=>{
    console.log(`Server Initialised at port ${process.env.PORT}...`)
})