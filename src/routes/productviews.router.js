import {Router} from "express"
import mongoose, { mongo } from "mongoose"
import FileManager from "../dao/manager/file.manager.js"
import productModel from "../dao/models/product.model.js"


const fileManager = new FileManager('products.json')
const router = Router()

//obtiene y visualiza el array
router.get('/', async (req, res) => {
    const products = await productModel.find().lean().exec()
    res.render('index', {products})
} )

//borrar producto
router.get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await productModel.deleteOne({_id: id})
    res.redirect('/products')
} )

// crear productos
router.get('/create', async (req, res) => {
    res.render('create' ,{})
} )

//crear producto
router.post('/create', async (req, res) => {
    const productNew = req.body

    const result = new productModel(productNew)
    await result.save()

    res.redirect('/products/' + productNew.id)
} )


//muestra solo un producto segun id
router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await productModel.findOne({id: id}).lean().exec()
    res.render('product' ,{product})
} )

export default router