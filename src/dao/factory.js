import config from '../config/config.js'
import mongoose from 'mongoose'

export let Cart
export let Message
export let Product
export let User
export let Ticket

switch (config.persistence) {
    case 'FILE':
        console.log('using files...');

        const { default: ProductFile } = await import('./file/products.file.js')
        const { default: MessageFile } = await import('./file/messages.file.js')
        const { default: UserFile } = await import('./file/user.file.js')
        const { default: CartFile } = await import('./file/cart.file.js')
        const { default: TicketFile } =await import('./file/ticket.file.js');

        Product = ProductFile
        Message = MessageFile
        User = UserFile
        Cart = CartFile
        Ticket = TicketFile

        break
    default: //case 'MONGO':
    
        console.log('connecting mongo...');
        mongoose.set('strictQuery', false)
        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongoDbName,

        }, () => console.log('Mongo connected'))

        const { default: ProductMongo } = await import('./mongo/products.mongo.js')
        const { default: MessageMongo } = await import('./mongo/messages.mongo.js')
        const { default: UserMongo } = await import('./mongo/user.mongo.js')
        const { default: CartMongo } = await import('./mongo/cart.mongo.js')
        const { default: TicketMongo } =await import('./mongo/ticket.mongo.js');

        Product = ProductMongo
        Message = MessageMongo
        User = UserMongo
        Cart = CartMongo
        Ticket = TicketMongo

        break
}