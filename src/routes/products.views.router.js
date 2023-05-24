import { Router } from "express";
import { getForIndex } from "../controller/products.controller.js"


const router = Router()

router.get('/', getForIndex)


export default router