import UserDTO from '../dao/dto/user.dto.js'

export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    getAll = async()=>{
        try {
            return await this.dao.getAll();
        } catch (error) {
            console.log('Error en getAll: '+ error);
        }
    }

    create = async(data) => {
        try {
            const dataToInsert = new UserDTO(data)
            const result = await this.dao.add(dataToInsert)
            return result
        } catch (error) {
            console.log('Error en create: '+ error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.dao.getOne(id);
        } catch (error) {
            console.log('Usuario no encontrado');
        }
    }

    getOneByEmail = async(email)=>{
        try {
            return await this.dao.getOneByEmail(email);
        } catch (error) {
            console.log('Usuario no encontrado por mail');
        }
    }

    update = async (id, newUser)=>{
        try {
            const userToInsert = new UserDTO(newUser);
            const result = await this.dao.update(id, userToInsert);
            return result;
        } catch (error) {
            console.log('Error en update: ' + error);
        }
    }

} 




