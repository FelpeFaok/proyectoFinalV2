import {ProductService } from "../repository/index.js";


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

        const user = req.user.user || {};
        console.log(user);
        return res.render('logHome', {
            user,
            role: (user?.role == 'admin'),
            style: 'logHome.css',
            data: products.docs
        });
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const getOne = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const prod = await ProductService.getOne(pid);
        if (!prod) {
            console.log(`Error obtener producto id:${pid})`);
        }
        res.send({ status: 'successful', payload: prod })
    } catch (error) {
        req.logger.error('Error: ', error);
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


// export const create = async(req, res)=>{
//     try {
//         const product = req.body;
//         const user = req.user.user;
//         product.owner = {
//             role: user.role,
//             id: user._id
//         }
//         const productAdded = await ProductService.create(product);
//         if (!productAdded) {
//             console.log("Error al crear el producto");
//         }
//         res.json({
//             status: "Success",
//             productAdded
//         })
//     } catch (error) {
//         console.log('Error: ' +error);
//         res.json({error})
//     }
// }

export const update = async(req, res)=>{
    try {
        const pid = req.params.pid;
        const update = req.body;
        const result = await ProductService.update(pid, update);
        if (!result) {
            console.log(`Error actualizar producto id:${pid})`);
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
            console.log(`Error eliminar producto id:${pid})`);
        }
        res.send({ status: 'successful', payload: result });
    } catch (error) {
        console.log('Error: ' +error);
    }
}