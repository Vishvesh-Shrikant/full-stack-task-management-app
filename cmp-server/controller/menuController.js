import Menu from "../models/MenuSchema.js";

export const getMenuItems =async(req, res)=>{
    try
    {
        const menuItems= await Menu.find({})
        return res.status(200).json({success:true, msg:"All menu items fetched", menu:menuItems})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err, msg:"There has been some error"})
    }
}

export const addMenuItem= async(req, res)=>{
    try
    {
        const {itemName, category, price}= req.body
        const existingItem= await Menu.findOne({itemName})
        if(existingItem)
            return res.status(409).json({success:false, msg: "Menu Item already exists", existingItem: existingItem})

        const newItem= await Menu.create({
            itemName, category, price
        })
        return res.status(201).json({success:true, msg:"New Menu Item created", menuItem: newItem})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err, msg:"There has been some error"})
    }
}

export const updateMenuItem = async(req, res)=>{
    try{
        const id= req.params.id
        const {name, category, price, isAvailable}= req.body

        const existingItem= await Menu.findById(id)
        if(!existingItem)
            return res.status(404).json({success:false, msg:"Menu item not found", updatedItem: null})
        
        let updateItem= {}
        if(name)
            updateItem.name= name
        if(category)
            updateItem.category= category
        if(price)
            updateItem.price= price
        if(isAvailable !== undefined)
            updateItem.isAvailable= isAvailable

        const updatedItem = await Menu.findByIdAndUpdate(id, {$set:updateItem}, { new: true })
        if(updatedItem)
            return res.status(200).json({success:true, msg:"Menu Items updated successfully", updatedItem})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err, msg:"There has been some error"})
    }
}


export const deleteMenuItem = async(req, res)=>{
    try{

        const id= req.params.id
        const existingItem= await Menu.findById(id)
        if(!existingItem)
            return res.status(404).json({success:false, msg:"Menu Item not found", item: null})

        const deletedItem= await Menu.findByIdAndDelete(id)
        if(deletedItem)
            return req.status(204).json({success:true, msg:"Menu Item deleted successfully", deletedItem})      
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err, msg:"There has been some error"})
    }
}