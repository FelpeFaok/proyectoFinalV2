import {Router} from "express"
import CartManager from "../dao/manager/cart.manager.js"
import cartModel from "../dao/models/cart.model.js"

const cartManager = new CartManager('carts.json')
const router = Router()

//obtiene y visualiza el array
router.get('/', async (req, res) => {
    const carts = await cartModel.find().lean().exec()
    res.render('index', {carts})
} )

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const cart = await cartManager.getByID(id)
    res.render('cart' ,{cart})
} )

export default router