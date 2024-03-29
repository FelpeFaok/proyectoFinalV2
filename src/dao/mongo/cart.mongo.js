import CartModel from "./models/cart.model.js";
import ProdutsModel from "./models/products.model.js";

export default class Cart {

    constructor() {}

    getAll = async () => {
        try {
            const carts = await CartModel.find().lean().exec();
            return carts;
        } catch (error) {
            console.log('Error para obtener carts: ' + error);
        }
    }
    
    getOne = async (id) => {
        try {
            const cart = await CartModel.findById(id).populate('products.id').lean().exec();
            return cart;
        } catch (error) {
            console.log('carrito no encontrado en mongo' + error);
        }
    }
    
    create = async (cart) => {
        try {
            const result = await CartModel.create(cart);
            return result;
        } catch (error) {
            console.log('Error al crear producto: ' + error);
        }
    }
    
    addProduct = async (id, pid, quantity) => {
        try {
            const cart = await CartModel.findById(id);
            const idx = cart.products.findIndex(prod => prod.id == pid);
            if (idx != -1) {
                cart.products[idx].quantity = quantity;
            } else {
                cart.products.push({id: pid, quantity: quantity});
            }
            return await cart.save();
        } catch (error) {
            console.log('Error: carrito no encontrado', error);
        }
    }
    
    update = async (id, newProducts) => {
        try {
            const cart = await CartModel.findById(id);
            cart.products = newProducts;
            return await cart.save();
        } catch (error) {
            console.log('Error: carrito no encontrado');
        }
    }
    
    updateProduct = async (id, pid, quantity) => {
        try {
            const cart = await CartModel.findById(id);
            const idx = cart.products.findIndex(prod => prod.id == pid);
            if (idx != -1) {
                cart.products[idx].quantity = quantity;
            } else {
                return { status: 'ERROR', error: 'mongo: Producto no encontrado' }
            }
            return await cart.save();
        } catch (error) {
            console.log('Error para actualizar en mongo: ' + error);
        }
    }
    
    delete = async (id) => {
        try {
            const result = await CartModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }
    
    clearCart = async (id) => {
        try {
            const cart = await CartModel.findById(id);
            cart.products = [];
            return await cart.save();
        } catch (error) {
            console.log('carrito no encontrado');
        }
    }
    
    deleteOneProduct = async (id, pid) => {
        try {
            const cart = await CartModel.findById(id);
            const idx = cart.products.findIndex(p => p.id == pid);
            if (idx < 0) return { status: 'Error', error: 'producto no encontrado' };
            if (idx == 0 && cart.products.length == 1) {
                cart.products = [];
            } else {
                cart.products = cart.products.slice(idx, 1);
            }
            return await cart.save();
        } catch (error) {
            console.log('Error al borrar un producto en mongo: ' + error);
        }
    }
    
    purchase = async (cid) => {
        try {
            const cart = await this.getOne(cid);
            let totalPrice = 0;
            const noStock = [];
            const comparation = cart.products;
            console.log(comparation);
            comparation.map(async p => {
                if (p.id.stock >= p.quantity){
                    p.id.stock -= p.quantity;
                    totalPrice += p.id.price * p.quantity;
                    await ProdutsModel.findByIdAndUpdate({_id: p.id._id}, p.id);
                } else {
                    noStock.push(p.id);
                }
            });
            console.log(totalPrice);
            console.log(noStock);
            return {noStock, totalPrice};
        }catch (error) {
            console.log('carrito no encontrado mongo:' + error);
        }
    }

}
