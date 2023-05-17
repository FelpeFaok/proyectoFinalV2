import ProductDTO from '../DAO/DTO/products.dto.js'

export default class ProductRepository {

    constructor(dao) {
        this.dao = dao
    }

    getAll = async (limit, page, filter, sortQuery, sortQueryOrder) => {
        try {
            const search = {}
            if (filter) {
                search.title = filter
            }
            const sort = {}
            if (sortQuery) {
                sort.sortQuery = sortQueryOrder;
            }
            const options = {
                limit,
                page,
                sort,
                lean: true
            }
            return await this.dao.getAll(search, options);
        } catch (error) {
            console.log('Error obteniendo datos: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            return await this.dao.getOne(id);
        } catch (error) {
            console.log('Producto no encontrado');
        }
    }

    create = async(data) => {
        try {
            const productToInsert = new ProductDTO(data)
            return await this.dao.create(productToInsert)
    }catch (error) {
        console.log('Error: ' + error);
        }
    }
    
    update = async (id, newProd) => {
        try {
            const userToInsert = new ProductDTO(newProd);
            const result = await this.dao.update(id, userToInsert);
            return result;
        } catch (error) {
            console.log('Error al actualizar: ' + error);
        }
    }

    delete = async(pid)=>{
        try {
            return await this.dao.delete(pid);
        } catch (error) {
            console.log('Error al eliminar: ' + error);
        }
    }

    delete = async(pid, owner)=>{
        try {
            const prod = await this.getOne(pid);
            if(prod.owner.role == owner.role || "admin" == owner.role){
                if(prod.owner.id != owner._id) return null;
                return await this.dao.delete(pid);
            }
        } catch (error) {
            console.log('Error al eliminar: ' + error);
        }
    }
}






