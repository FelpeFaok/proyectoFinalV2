import {ProductService } from "../repository/index.js";

export const get = async(req, res) => {
    const products = await ProductService.get()
    const limit = req.query.limit || 5

    res.json(products.slice(0, parseInt(limit)))
}

export const create = async (req, res) => {
    try {
        const products = req.body
        if (!products.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await ProductService.create(products)
        req.io.emit('updatedProducts', await ProductService.get());
        res.json({
            status: "Success",
            productAdded
        })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

