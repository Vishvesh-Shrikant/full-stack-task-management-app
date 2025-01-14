import Menu from '../models/MenuSchema.js'
import Orders from '../models/OrderShcema.js'

export const getOrders= async(req, res)=>{
    try{ 
        const userId= req.user.id

        const allOrders= await Orders.find({userId})
        console.log(allOrders)
        if(!allOrders)
        {
            return res.status(404).json({success:false , msg:"There was an error", orders: null})
        }
        if(allOrders.length==0)
            return res.status(200).json({success:true, msg:"You have not placed any orders", orders: allOrders})
        return res.status(200).json({success:true, msg:"All orders fetched", orders: allOrders})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
}

export const addOrders=async(req, res)=>{
    try{
        const userId= req.user.id
        const items= req.body.items
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({success:false,  error: 'Invalid order data' , order: null});
        } 
        

        let totalPrice=0
        await Promise.all(
            items.map(async (item)=>{
                const menuItem= await Menu.findById(item.itemId)
                totalPrice= totalPrice+ (menuItem.price * item.quantity)
            })
        )
        const newOrder= await Orders.create({
            userId, 
            items, 
            totalPrice, 
            status: "Pending", 
        })
        return res.status(201).json({success:true, msg:"Order Placed Successfully", order:newOrder})

    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({success:false, error:err})

    }
}
