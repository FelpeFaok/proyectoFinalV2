import { Router } from "express";
import { ProductService } from "../repository/index.js";
// import productModel from "../dao/models/product.model.js"

const router = Router()

router.get('/', async(req, res) => {

    const limit = req.query?.limit || 10
    const page = req.query?.page || 1

    const options = {
        limit,
        page,
        lean: true
    }

    const data = await ProductService.getPaginate({}, options)
    const user = req.session.user
    // console.log(data)

    const front_pagination = []
    for (let i = 1; i <= data.totalPages; i++) {
        front_pagination.push({
            page: i,
            active: i == data.page
        })
    }

    res.render('admin/products', {data, user, front: {pagination: front_pagination}})
})


// router.get('/', async (req, res) => {
//     const limit = req.query?.limit || 10
//     const page = req.query?.page || 1

//     const options = {
//         limit,
//         page,
//         lean: true
//     }

//     const data = await productModel.paginate({}, options)
//     const user = req.session.user
//     const front_pagination = []
//     for (let i = 0; i <= data.totalPages.length; i++) {
//         front_pagination.push({
//             page: i, 
//             active: i == data.page
//         })
        
//     }
//     res.render('admin/products', {data, user, front: {pagination: front_pagination}})
// })

export default router