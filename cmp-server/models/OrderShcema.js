import mongoose, {  Schema } from "mongoose";


const itemSchema= new Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Menu", 
        required:true, 
    },
    quantity:{
        type: Number, 
        required:true, 
    }
})

const orderSchema= new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required:true, 
        unique:false, 
    }, 
    items:[itemSchema],
    totalPrice:{
        type:Number, 
        required: true, 
    }, 
    status:{
        type:String, 
        required:true, 
    }, 
    createdAt:{
        type:Date, 
        required: true, 
        default: Date.now()
    }
})

const Orders= mongoose.model("Orders", orderSchema)

export default Orders