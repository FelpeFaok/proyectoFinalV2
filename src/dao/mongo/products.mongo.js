import ProductModel from "./models/products.model.js";

export default class Product {

    constructor() {}

    getOne = async (id) => {
        try {
            const prod = await ProductModel.findById(id).lean().exec();
            return prod;
        } catch (error) {
            console.log('producto no encontrado');
        }
    }

    getAll = async (search, options) => {
        try {
            const products = await ProductModel.paginate(search, options);
            return products;
        } catch (error) {
            console.log('Error obteniendo productos: ' + error);
        }
    }

    create = async (newProd) => {
        try {
            const result = await ProductModel.create(newProd);
            return result;
        } catch (error) {
            console.log('Error al crear producto: ' + error);
        }
    }

    update = async (id) => {
        try {
            const result = await ProductModel.findByIdAndUpdate(id);
            return result 
        } catch (error) {
            console.log('Error producto no encontrado');
        }
    }

    delete = async (id) => {
        try {
            const result = await ProductModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }
}
