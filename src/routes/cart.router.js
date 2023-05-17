import { Router } from 'express';
import { addProduct, clearCart, create, deleteCart, deleteOneProduct, getAll, getOne, update, updateProduct, purchase } from '../controller/carts.controller.js';
import { authorization } from '../utils.js';

const router = Router();

router.get('/', authorization('admin'), getAll);

router.get('/:cid', authorization('user'), getOne);

router.post('/', authorization('user'), create);

router.post('/:cid/products/:pid', authorization('user'), addProduct);

router.put('/:cid', authorization('user'), update);

router.put('/:cid/products/:pid', authorization('user'), updateProduct);

router.delete('/:cid', authorization('admin'), deleteCart)

router.delete('/:cid', authorization('user'), clearCart);

router.delete('/:cid/products/:pid', authorization('user'), deleteOneProduct)

router.post('/:cid/purchase',authorization('user'), purchase);

export default router;


























//--------------------------------------------------------------//
// import cartModel from '../dao/models/cart.model.js'

// //obtiene y visualiza el array desde el model
// router.get('/', async (req, res) => {
//     const carts = await cartModel.find().lean().exec()
//     res.json({carts})
// } )

// // busca por id en el model
// router.get('/:id', async (req, res) => {
//     const id = parseInt(req.params.id)
//     const cart = await cartModel.findOne({_id: id})
//     res.json({cart})
// } )

// // crea nuevo carrito
// router.post('/', async (req, res) => {
//     const newCart = await cartModel.create({})
//     res.json({status: "success", newCart})
// })

// // busca carrito por id, luego en producto por id y le suma uno o lo crea
// router.post('/:cid/product/:pid', async (req, res) => {
//     const cartID = req.params.cid
//     const productID = req.params.pid
//     const quantity = req.body.quantity || 1
//     const cart = await cartModel.findById(cartID)

//     let found = false
//     for (let i = 0; i < cart.products.length; i++) {
//         if(cart.products[i].id == productID){
//             cart.products[i].quantity++
//             found = true
//             break
//         }
        
//     }
//     if (found == false){
//         cart.products.push({id: productID, quantity})
//     }

//     await cart.save()

//     res.json({status: "success", cart})
// })
// // Elimina producto seleccionado desde el carrito elegido
// router.delete('/:cid/product/:pid', async (req, res) => {
//     const cartID = req.params.cid
//     const productID = req.params.pid
    
//     const cart = await cartModel.findById(cartID)
//     if(!cart) return res.status(404).json({status: 'error', error: '♫ Cart Not Found ♫'})

//     const productIDX = cart.products.findIndex(p => p.id == productID)

//     if(productIDX <= 0) return res.status(404).json({status: 'error', error: '♫ Product Not Found ♫'})

//     cart.products = cart.products.splice(productIDX, 1)
//     await cart.save()

//     res.json({status: 'Success', cart})
// })


