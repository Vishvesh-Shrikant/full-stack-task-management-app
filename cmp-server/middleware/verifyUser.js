import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()

const verifyToken=(req, res, next) =>
{     
    const authHeader= req.header('Authorization')
    const authToken = authHeader && authHeader.split(' ')[1];
    if (!authToken) 
    {
        return res.status(401).json({success:false, msg: 'No token, authorization denied' });
    }
    try 
    {
        jwt.verify(authToken, process.env.ACCESS_SECRET, (err, decoded)=>{
            if(err)
            {
                return res.status(401).json({success: false, error: "Invalid Token!!!"});
            }
            else
            {
                req.user = decoded;
                next();
            }
        });
        
    } 
    catch (err)  
    {
        res.status(403).json({success:false, msg:"Not a valid token"});
    }
} 

export default verifyToken