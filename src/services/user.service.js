import UserDTO from "../dao/DTO/user.dto.js";
import User from "../dao/mongo/user.mongo.js"; 

export default class UserService{
    constructor(){
        this.mongoUser = new User();
    }

    getAll = async()=>{
        try {
            return await this.mongoUser.getAll();
        } catch (error) {
            console.log('Error al obtener todos: ' + error);
        }
    }

    getOne = async(id)=>{
        try {
            return await this.mongoUser.getOne(id);
        } catch (error) {
            console.log('carrito no encontrado');
        }
    }

    create = async (user) =>{
        try {
            const userToInsert = new UserDTO(user);
            const result = await this.mongoUser.create(userToInsert);
            return result;
        } catch (error) {
            console.log('Error al crear el carrito: ' + error);
        }
    }

    update = async (id, user)=>{
        try {
            const userToInsert = new UserDTO(user);
            const result = await this.mongoUser.update(id, userToInsert);
            return result;
        } catch (error) {
            console.log('Error al actualiazr un producto: ' + error);
        }
    }
}