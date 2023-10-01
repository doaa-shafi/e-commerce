const Order = require("../models/order");
const User = require("../models/user");
const Product=require("../models/product");
const {ValidationError}=require('../helpers/errors')

class orderService{

  async getOrders(page,limit){
    return await Order.find({}).skip(limit*(page-1)).limit(limit);
  }

  async getOrder(id){
    return await Order.findById(id);
  }

  async getCustomerOrders(id){
    return await Order.find({'user.id':id});
  }

  async addToCart(customer,product_id,quantity){
    const product=await Product.exists({_id: product_id})
    if (product===null) throw new ValidationError("Product does not exist")  
    const user =await User.findById(customer)
    var found=false
    for(let i=0;i<user.cart.length;i++){
      if(user.cart[i].product.toString()===product_id){
        user.cart[i].quantity=user.cart[i].quantity+quantity
        found=true
      }
    }
    if(found===false){
      user.cart.push({product: product_id,quantity:quantity})
    }
    await User.findByIdAndUpdate(customer,user);
    return "Product added successfully"
  }

  async createOrder(address,id){
    const user = await User.findById(id);
    if(user.cart.length===0) throw new ValidationError("Your cart is empty") 
    let ids=[]
    for(let i=0;i<user.cart.length;i++){
      ids.push(user.cart[i].product)
    }
    let results=[]
    const products=await Product.find({ _id: { $in:ids} }, {category:0})
    for(let i=0;i<products.length;i++){
      for(let j=0;j<user.cart.length;j++){
        if(products[i]._id.toString()===user.cart[j].product.toString()){
          results.push({name:products[i].name,price:products[i].price,quantity:user.cart[j].quantity})
          break;
        }
      }
    }
    const totalPrice = results.reduce((accumulator, object) => {
      return accumulator + object.price*object.quantity;
    }, 0);
    await Order.create({
      products: results,
      user: {id:user._id,name:user.username},
      totalPrice: totalPrice,
      address: address,
    });
    await User.findByIdAndUpdate(id,{cart:[]})
    return "Order created successfully"
  }
}

module.exports = new orderService()