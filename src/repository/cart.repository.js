import CartDTO from '../DAO/DTO/cart.dto.js'

export default class CartRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async() => {
        return await this.dao.get()
    }

    create = async(data) => {
        const dataToInsert = new CartDTO(data)
        const result = await this.dao.create(dataToInsert)

        return result
    }

}