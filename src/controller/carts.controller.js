import {CartService, TicketService } from "../repository/index.js";


export const create = async (req, res) =>{
    try {
        const createCart = await CartService.create();
        if(!createCart){
            console.log("Error al crear carrito (controller)")
            }
        res.send({status: 'Fail', createCart});
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const getAll = async (req, res) =>{
    try {
        const carts = await CartService.getAll();
        if(!carts){
            console.log('Error obtener carrito (controller)')
        }
        res.render('carts',
        { 
            titlePage: 'Carts',
            style: 'cart.css',
            carts
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const getOne = async (req, res) =>{
    try {
        const cid =  req.params.cid;
        const cart = await CartService.getOne(cid);
        if(!cart){
            console.log("Error al crear carrito (controller)")
        }
        return res.render('carts', {
            titlePage: 'Cart',
            style: 'cart.css',
            cart
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const addProduct = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body?.quantity || 1;
        
        const result = await CartService.addProduct(cid, pid, quantity);
    
        if(!result){
            console.log("Error al crear carrito (controller)")
        }
        res.redirect(`/api/carts/${cid}`);
    } catch (error) {
        console.log('Error: ', error);
    }

}
export const update = async (req, res) =>{
    try {
        const newProducts= req.body;
        const cid = req.params.cid;
        const cart = await CartService.update(cid, newProducts);
        if(!cart){
            console.log('Error obtener carrito (controller)')
        }        
        res.json({status: 'successful', cart})
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const updateProduct = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body?.quantity || 1;
    
        const cart = await CartService.updateProduct(cid, pid, quantity);
        if(!cart){
            console.log('Error actualizar carrito (controller)')
        }
        res.json({status: 'successful', cart})
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const deleteCart = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const result = await CartService.deleteCart(cid);
        if(!result){
            console.log('Error eliminar carrito (controller)')
        }
        res.json({status: 'delete successful', result});
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const clearCart = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const cart = await CartService.clearCart(cid);
        if(!cart){
            console.log('Error vaciar carrito (controller)')
        }
        res.json({status: 'successful', cart})
    } catch (error) {
        console.log('Error: ', error);
    }

}
export const deleteOneProduct = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cart = await CartService.deleteOneProduct(cid, pid);
        if(!cart){
            console.log('Error borrar un prodructo carrito (controller)')
        }
        res.json({status: 'successful', cart})
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const purchase = async (req, res) =>{
    try {
        const cid = req.params.cid;
        const user = req.user.user;
        console.log(user);
        const status = await CartService.purchase(cid);
        if(!status){
            console.log('Error al momento de comprar carrito (controller)' )
        }
        await CartService.update(cid, status.noStock);
        if(status.totalPrice>0){
            const resultTocken = await TicketService.create(user.email, status.totalPrice);
            status.tocken = resultTocken;
        }
        res.json({status: 'successful', status});
    } catch (error) {
        console.log('Error: ', error);
    }
}