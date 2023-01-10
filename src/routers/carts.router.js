import {Router} from "express"
import CartManager from "../dao/manager/cart.manager.js"


const cartManager = new CartManager('carts.json')
const router = Router()

//obtiene y visualiza el array
router.get('/', async (req, res) => {
    const carts = await cartManager.get()
    res.json({carts})
} )

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const cart = await cartManager.getByID(id)
    res.json({cart})
} )
// crea nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.create()


    res.json({status: "success", newCart})
})
//busca por params lo solicitado y lo modifica por key (nombre)
router.post('/:cid/product/:pid', async (req, res) => {
    const cartID = parseInt(req.params.cid)
    const productID = parseInt(req.params.pid)

    const cart = await cartManager.addProduct(cartID, productID)
    
    res.json({status: "success", cart})
})

export default router