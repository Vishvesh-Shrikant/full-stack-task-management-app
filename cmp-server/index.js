import express from 'express'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import corsOption from './config/corsOption.js'
import connectDB from './config/dbConfig.js'
const app=express()

connectDB()
app.use(express.json())
app.use(cors(corsOption))
app.use('/api/auth', authRoutes)


app.get('/health', (req, res) => res.status(200).json({ status: 'ok' })); 
app.get('/', (req, res)=>{
    res.status(200).json({success:true, msg:"all good"})
})

app.listen((process.env.PORT || 5000), ()=>{
    console.log(`Server Initialised at port ${process.env.PORT}...`)
})