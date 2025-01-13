import User from '../models/UserSchema.js'
import bcrypt from 'bcryptjs'
import token from '../middleware/generateToken.js'
 export const registerUser= async(req, res)=>{
    try
    {
        const { fullName, username, password} = req.body
        const usernameExists= await User.findOne({username});
        //checking if user with same username already exists or not 
        if(usernameExists)
        {
            return res.status(409).json({success:false, msg:"Username already exists", user: null})
        }
        //hashing the user's password
        const hashedPassword= await bcrypt.hash(password, 10)

        //created a nwe user
        const newUser= await User.create({
            fullName,
            username, 
            password: hashedPassword, 
        })
        return res.status(201).json({success:true, msg:"User created successfully", user:newUser})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
}


 export const loginUser = async (req, res)=>{
    try
    {
        const {username, password}= req.body
        const usernameExists= await User.findOne({username});
        //checks if username exists or not , if it does not exist means user has created an account
        if(!usernameExists)
        {
            return res.status(401).json({success:false, msg:"User does not exist", user: null})
        }


        //checks if password entered by user is same as user's password 
        const isPasswordCorrect= await bcrypt.compare(password, usernameExists.password)
        if(!isPasswordCorrect)
        {
            return res.status(401).json({success:false, msg:"Incorrect Password", user: null})
        }

        //generating the token 
        const payload= { id: usernameExists._id, username: usernameExists.username, fullName:usernameExists.fullName}
        const accessToken= token.generateAccessToken(payload)
        const refreshToken= token.generateRefreshToken(payload)
        //adding the refresh token to the user 
        usernameExists.refreshToken=refreshToken
        usernameExists.save()

        return res.status(200).json({success:true, msg: "User logged in succesfully", user: usernameExists, accessToken: accessToken})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err, msg:"There has been some error"})
    }
}


