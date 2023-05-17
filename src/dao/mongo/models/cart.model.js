import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number
        }],
        default: []
    }
})
cartSchema.pre('find', function(){
    this.populate('products.id');
})
mongoose.set("strictQuery", false)
const CartModel = mongoose.model(cartCollection, cartSchema)

export default CartModel