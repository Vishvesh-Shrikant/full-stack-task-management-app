import mongoose, { mongo, Schema } from "mongoose";


const menuSchema= new Schema({
    name:{
        type:string, 
        required: true, 
        unique:true, 
    },
    category:{
        type:string, 
        required:true
    },
    price:{
        type:Number, 
        required:true
    },
    availablity:{
        type: Boolean, 
        required:true, 
        default:true, 
    }
})

const Menu= mongoose.model("Menu", menuSchema)

export default Menu