import {Router} from "express"
import { get , create } from "../controller/products.controller.js"


const router = Router()

router.get("/", get)
router.post("/", create)



export default router






















//------------------------------------------------------------------------------//
// import productModel from "../dao/models/product.model.js"

// //obtiene y visualiza el array
// router.get('/', async (req, res) => {
//     const products = await productModel.find().lean().exec()
//     const limit = req.query.limit || 5
    
//     res.json(products.slice(0, parseInt(limit)))
// })

// // renderiza los productos en tiempo real (/view)
// router.get("/productexisit", async (req, res) =>{
//     const products = await productModel.find().lean().exec()
//     res.render('productexisit', {
//         data: products
//     })
// })
// // buscar producto por id
// router.get("/:id", async (req, res) => {
//     const id = req.params.id
//     const product = await productModel.findOne({_id: id})
//     res.json({product})
// })

// // borrar producto por id
// router.delete('/:pid', async (req, res) => {
//     const id = req.params.pid
//     const productDeleted = await productModel.deleteOne({_id: id})

//     req.io.emit('updateProducts', await productModel.find().lean().exec())
//     req.json({status: 'Success', message: "Product Deleted!", productDeleted})
// })


// // postea nuevos elementos en el array
// router.post('/', async (req, res) => {
//     try {
//         const product = req.body
//         if (!product.title){
//             return res.status(400).json({message: "Error: Falta el nombre del producto"})
//         }
//         const productAdded = await productModel.create(product)
//         req.io.emit('updateProducts', await productModel.find().lean().exec())
//         res.json({status: "Success", productAdded})
//     } catch (error) {
//         console.log(error);
//         res.json({error})
//     }
// })

// router.put("/:pid", async (req, res) => {
//     const id = req.params.pid
//     const productUpdate = req.body

//     const product = await productModel.updateOne({
//         _id: id}, productUpdate)
//         req.io.emit('updateProducts', await productModel.find().lean().exec())
//         res.json({status: "Success", product})
// })

