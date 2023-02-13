import mongoose from "mongoose"

const messegeCollection = 'messege'

const messegeSchema = new mongoose.Schema({

    email: String,
    user: String,
    message: Number,
})

const messegeModel = mongoose.model(messegeCollection, messegeSchema)

export default messegeModel

