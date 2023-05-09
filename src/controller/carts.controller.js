import {CartService } from "../repository/index.js";

export const get = async(req, res) => {
    const carts = await CartService.get()
    res.json({carts})
}

export const create = async(req, res)=> {
    const cartsNew = await CartService.add(carts)

    res.json({status: "Success",cartsNew})
}