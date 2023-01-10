import mongoose from "mongoose"

const productCollection = 'products'

const productSchema = new mongoose.Schema({

    name: String,
    price: Number,
    id: Number

})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel