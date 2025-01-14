import mongoose, { mongo, Schema } from "mongoose";


const menuSchema= new Schema({
    itemName:{
        type:String, 
        required: true, 
        unique:true, 
    },
    category:{
        type:String, 
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