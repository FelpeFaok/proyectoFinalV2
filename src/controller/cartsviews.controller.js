import CartManager from "../dao/manager/cart.manager.js"
import cartModel from "../dao/models/cart.model.js"

const cartManager = new CartManager('carts.json')

//obtiene y visualiza el array

export const cartViews = async (req, res) => {
    const carts = await cartModel.find().lean().exec()
    res.render('index', {carts})
} 

export const cartViewsID = async (req, res) => {
    const id = parseInt(req.params.cid)
    const cart = await cartManager.getByID(id)
    res.render('cart' ,{cart})
}