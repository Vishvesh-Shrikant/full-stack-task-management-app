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

export const checkRefreshToken= async(req, res)=>{
    try
    {
        let refreshToken= req.cookies.refreshToken

        if( refreshToken== null)
            return res.status(401).json({success:false, msg:"Unauthorized access"})

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async(err, user)=>{
            //If refresh token is not verified 
            if(err)
                return res.status(403).json({success:false, msg:"Forbidden Access"})
            //If no user with refresh token is found 
            const dbUser = await User.findOne({ refreshToken });
            if (!dbUser) 
                return res.status(403).json({success:false, msg:"Forbidden Access"});
            //if user is found 
            const payload= { id: dbUser._id, username: dbUser.username, fullName:dbUser.fullName}
            const accessToken= token.generateAccessToken(payload)
            return res.status(200).json({success:true, accessToken})
        })
    }
    catch(err)
    {
        console.log("Error in code is: ", err)
    }
}

export const logoutUser= async(req, res)=>{
    const refreshToken= req.cookies.refreshToken
    if (refreshToken == null) 
        return res.status(401).json({success:false, msg:"Unauthorized access"});

    try
    {
        const user = await User.findOne({ refreshToken });
        if (!user) 
            return res.status(403).json({success:false, msg:"Forbidden Access"});

        res.cookie('refreshToken', '', { expires: new Date(0), sameSite:'strict', httpOnly: true });
        user.refreshToken = null;
        await user.save();
        return res.status(204).json({success:true, msg: "User logged out successfully" });
    }
    catch(err)
    {
        res.status(500).json({success:false,  error: 'Internal Server Error' });
    }8
}