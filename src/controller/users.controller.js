import { UserService } from "../repository/index.js";


export const getAll = async (req, res) =>{
    try {
        const users = await UserService.getAll();
        if (!users){
            console.log('Error obtener usuarios');
        }
        res.json({ status: 'Success', users});
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const getOne = async (req, res) =>{
    try {
        const uid = req.params.uid;
        const user = await UserService.getOne(uid);
        if (!user) {
            console.log(`Error obtener usuario id:${uid}`);
        }
        res.json({ status: 'Success', user});
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const create = async (req, res) =>{
    try {
        const data = req.body;
        const result = await UserService.create(data);
        if (!result) {
            console.log('Error crear usuarios');
        }
        res.json({ status: 'Success', result});
    } catch (error) {
        console.log('Error: ', error);
    }

    
}

export const update = async(req, res) =>{
    try {
        const uid = req.params.uid;
        const data = req.body;
        const result = await UserService.update(uid, data);
        if (!result) {
            console.log('Error actualizar usuario');
        }
        res.json({ status: 'Success', result});
    } catch (error) {
        console.log('Error: ', error);
    }
}
