import {ProductService } from "../repository/index.js";


export const getForIndex = async (req, res) => {
    try {
        let limit = req.query?.limit ?? 10;
        let page = req.query?.page ?? 1;
        let filter = req.query?.filter ?? '';
        let sortQuery = req.query?.sort ?? '';
        let sortQueryOrder = req.query?.sortOrder ?? 'desc';

        const products = await ProductService.getAll(limit, page, filter, sortQuery, sortQueryOrder);
        if (!products) {
            console.log("Error al obtener productos");
        }
        const front_pagination = []
        for (let i = 1; i <= products.totalPages; i++) {
            front_pagination.push({
                page: i,
                active: i == products.page
            })
        }
        res.render('index',{
                
                data: products.docs,
                front: {pagination: front_pagination}
                })


    } catch (error) {
        console.log('Error: ', error);
    }
}

export const getAll = async (req, res) => {
    try {
        let limit = req.query?.limit ?? 10;
        let page = req.query?.page ?? 1;
        let filter = req.query?.filter ?? '';
        let sortQuery = req.query?.sort ?? '';
        let sortQueryOrder = req.query?.sortOrder ?? 'desc';

        const products = await ProductService.getAll(limit, page, filter, sortQuery, sortQueryOrder);
        if (!products) {
            console.log("Error al obtener productos");
        }
        const front_pagination = []
        for (let i = 1; i <= products.totalPages; i++) {
            front_pagination.push({
                page: i,
                active: i == products.page
            })
        }
        const user = req.user.user || {};
        res.render('admin/products',{
                
                data: products.docs,
                user, 
                role: (user?.role == 'admin' || 'premium'),
                front: {pagination: front_pagination}
                })


    } catch (error) {
        console.log('Error: ', error);
    }
}

export const getOne = async(req, res)=>{
    console.log(req.params.pid);
    try {
        const pid = req.params.pid;
        const prod = await ProductService.getOne(pid);
        console.log(prod);

        if (!prod) {
            console.log(`Error obtener producto id:${pid}`);
        }
        res.send({ status: 'successful', payload: prod })
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const create = async (req, res) => {
    try {
        const products = req.body
        if (!products.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await ProductService.create(products)
        req.io.emit('updatedProducts', await ProductService.getAll());
        res.json({
            status: "Success",
            productAdded
        })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}

export const update = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const update = req.body;
        const result = await ProductService.update(pid, update);
        if (!result) {
            console.log(`Error actualizar producto id:${pid}`);
        }
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        console.log('Error: ' +error);
    }
}

export const deleteProd = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const user = req.user.user;

        const result = await ProductService.deleteByOwner(pid, user);
        if (!result) {
            console.log(`Error eliminar producto id:${pid}`);
        }
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        console.log('Error: ' +error);
    }
}