import {model, Schema} from 'mongoose'

const UserSchema = new Schema({
    fullName:{
        type: String, 
        required:true, 
    }, 
    username:{
        type: String, 
        required:true, 
        unique:true
    }, 
    password:{
        type: String, 
        required:true, 
    }, 
    refreshToken:{
        type: String, 
    }
})

const User= model('Users', UserSchema)

export default User