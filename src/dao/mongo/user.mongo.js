import UserModel from "./models/user.model.js"

export default class User {

    constructor() {}

    getAll = async () => {
        try {
            const users = await UserModel.find().lean().exec();
            return users;
        } catch (error) {
            console.log('Error para obtener usuarios: ' + error);
        }
    }

    getOne = async (id) => {
        try {
            const user = await UserModel.findById(id).lean().exec();
            return user;
        } catch (error) {
            console.log('Error para obtener usuarios: Usuario no encontrado');
        }
    }

    getByEmail = async (email) => {
        try {
            const user = await UserModel.findOne({ email: email }).lean().exec();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    create = async (newUser) => {
        try {
            const user = await UserModel.findOne({ name: newUser.name });
            if (user) return user;
            const result = await UserModel.create(newUser);
            return result;
        } catch (error) {
            console.log('Error al crear usuario: ' + error);
        }
    }
    update = async (id, updUser) => {
        try {
            const result = await UserModel.findOneAndUpdate(
                { _id: id }, 
                { password: updUser.password }, 
                { new: true } 
            )
                .then(updatedUser => {
                    console.log('Usuario actualizado:', updatedUser);
                })
                .catch(error => {
                    console.error('Error al actualizar usuario:', error);
                });
            return result;
        } catch (error) {
            console.log('Error en actualizacion mongo: ' + error);
        }
    }
}


