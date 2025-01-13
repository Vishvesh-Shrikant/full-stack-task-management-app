import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
config()

const generateAccessToken=(user)=>
{
    return jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRY });
}
const generateRefreshToken=(user)=>{
    return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRY });
}

export default {generateAccessToken, generateRefreshToken}