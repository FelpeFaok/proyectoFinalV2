import mongoose from "mongoose"

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({

    title: String,
    price: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    }

})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel


