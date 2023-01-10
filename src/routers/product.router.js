import {Router} from "express"
import FileManager from "../dao/manager/file.manager.js"
import productModel from "../dao/models/product.model.js"


const fileManager = new FileManager('products.json')
const router = Router()

//obtiene y visualiza el array
router.get('/', async (req, res) => {
    const products = await productModel.find()
    res.json({products})
} )
// postea nuevos elementos en el array
router.post('/', async (req, res) => {
    const product = req.body
    const productAdded = await productModel.create(product)

    res.json({status: "success", productAdded})
})
//busca por params lo solicitado y lo modifica por key (nombre)
router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const productToUpdate = req.body
    
    const product = await fileManager.getByID(id)
    if(!product) return res.status(404).send('Product not found')

    for (const key of Object.keys(productToUpdate)) {
        product[key] = productToUpdate[key]
    }

    await fileManager.update(id, product)

    res.json({status: "success", productAdded})
})

export default router