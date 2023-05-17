import CartDTO from '../dao/dto/cart.dto.js'
import Cart from "../dao/mongo/cart.mongo.js";

export default class CartService{
    constructor(){
        this.mongoCart = new Cart();
    }

    getAll = async()=>{
        try {
            return await this.mongoCart.getAll();
        } catch (error) {
            console.log('Error al obtener todos: '+ error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.mongoCart.getOne(id);
        } catch (error) {
            console.log('carrito no encontrado');
        }
    }

    create = async () =>{
        try {
            const cartToInsert = new CartDTO();
            const result = await this.mongoCart.create(cartToInsert);
            return result;
        } catch (error) {
            console.log('Error al crear el carrito: '+ error);
        }
    }

    addProduct = async (id, pid, quantity)=>{
        try {
            const result = await this.mongoCart.addProduct(id,pid, quantity);
            return result;
        } catch (error) {
            console.log('Error al agregar un producto' + error);
        }
    }

    update = async (id, products)=>{
        try {
            const result = await this.mongoCart.update(id, products);
            return result;
        } catch (error) {
            console.log('Error al actualiazr un producto: ' + error);
        }
    }

    updateProduct = (id, pid, quantity)=>{
        try {
            return this.mongoCart.updateProduct(id, pid, quantity);
        } catch (error) {
            console.log('Error al actualiazr un producto: ' + error);
        }
    }

    delete = async (id) =>{
        try {
            return await this.mongoCart.delete(id);
        } catch (error) {
            console.log('Error al borrar un producto: ' + error);
        }
    }

    clearCart = async (id)=>{
        try {
            return await this.mongoCart.clearCart(id);
        } catch (error) {
            console.log('Error al vaciar el carrito: ' + error);
        }
    }

    deleteOneProduct  = async (id, pid) =>{
        try {
            return await this.mongoCart.deleteOneProduct(id,pid);
        } catch (error) {
            console.log('Error al borrar un producto: ' + error);
        }
    }
}