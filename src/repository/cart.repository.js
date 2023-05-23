import CartDTO from '../dao/dto/cart.dto.js'

export default class CartRepository {

    constructor(dao) {
        this.dao = dao
    }

    getAll = async() => {
        try {
            return await this.dao.getAll();
        } catch (error) {
            console.log(error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.dao.getOne(id);
        } catch (error) {
            console.log(error);
        }
    }

    create = async() => {
        try {
        const dataToInsert = new CartDTO()
        const result = await this.dao.add(dataToInsert)
        return result 
        } catch (error) {
            console.log('Error al crear el carrito: '+ error);
        }
        
    }
    addProduct = async (id, pid, quantity)=>{
        try {
            const result = await this.dao.addProduct(id,pid, quantity);
            return result;
        } catch (error) {
            console.log('Error al agreagr un producto' + error);
        }
    }

    update = async (id, products)=>{
        try {
            const result = await this.dao.update(id, products);
            return result;
        } catch (error) {
            console.log('Error en actualizar: ' + error);
        }
    }

    updateProduct = (id, pid, quantity)=>{
        try {
            return this.dao.updateProduct(id, pid, quantity);
        } catch (error) {
            console.log('Error en actualizar un producto: ' + error);
        }
    }

    delete = async (id) =>{
        try {
            return await this.dao.delete(id);
        } catch (error) {
            console.log('Error al borrar: ' + error);
        }
    }

    clearCart = async (id)=>{
        try {
            return await this.dao.clearCart(id);
        } catch (error) {
            console.log('Error al vaciar el carrito: ' + error);
        }
    }

    deleteOneProduct  = async (id, pid) =>{
        try {
            return await this.dao.deleteOneProduct(id,pid);
        } catch (error) {
            console.log('Error al borrar un producto: ' + error);
        }
    }

    purchase = async (cid)=>{
        try {
            return await this.dao.purchase(cid);
        } catch (error) {
            console.log('Error en el servico de compra: ' + error);
        }
    }

}
