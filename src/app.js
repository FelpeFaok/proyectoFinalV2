import  express from "express"
import __dirname from "./utils.js"
import productRouter from "./routers/product.router.js"
import cartRouter from './routers/carts.router.js'
import cartViews from './routers/cartsviews.router.js'
import productViews from './routers/productviews.router.js'
import handlebars from 'express-handlebars'
import mongoose from "mongoose"


const app = express()

//trae la info de post como JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// motor de plantilla
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//configuramos carpeta publica
app.use(express.static(__dirname + '/public'))

//rutas
//productos
app.use('/products', productViews )
app.use('/api/products', productRouter )
//carritos 
app.use('/carts', cartViews )
app.use('/api/carts', cartRouter )


app.use('/', (req, res) => res.send('HOME'))

//coneccion a DB mongo atlas
// user Codertest
// pass 7z3fNIwiCWOfoez4
const MONGO_URI = 'mongodb+srv://Codertest:7z3fNIwiCWOfoez4@cluster0.ruk69i1.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI, {dbName: 'ecommerce'},
    error => {
        if(error){
            console.log('no se pudo conectar a la DB');
            return
        }
        console.log('DB connected!');
        app.listen(8080, () => console.log('Server listennig'))
    })