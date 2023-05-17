import { productsMock } from "../../utils.js";
import ProductDTO from "../dto/products.dto.js";

export default class Mocking{
    constructor(cant){
        this.products = productsMock(cant);
    }

    getAll = ()=>{
        try {
            return this.products;
        } catch (error) {
            console.log('productos no cargan');
        }
    }

    getOne = (pid)=>{
        try {
            return this.products.find(p => p.id == pid);
        } catch (error) {
            console.log('producto no encontrado');
        }
    }

    create = (product) =>{
        try {
            const productToInser = ProductDTO(product);
            this.products.push(productToInser);
            return productToInser;
        } catch (error) {
            console.log('Error en create');
        }
    }

    update = (pid, product)=>{
        try {
            const productToInser = ProductDTO(product);
            const idx = this.products.findIndex(p => p.id == pid);
            if(idx == -1) return error;
            this.products[idx] = productToInser;
            return productToInser;
        } catch (error) {
            console.log('producto no encontrado');
        }
    }

    delete = (pid) =>{
        try {
            const idx = this.products.findIndex(p => p.id == pid);
            if(idx == -1) return error;
            this.products.splice(idx,1);
            return true;
        } catch (error) {
            console.log('producto no encontrado');
        }
    }
}