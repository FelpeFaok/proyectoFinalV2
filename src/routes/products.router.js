import {Router} from "express"
import { create, deleteProd, getAll, getOne, update } from "../controller/products.controller.js"
import { authorization } from '../utils.js';


const router = Router();

router.get('/', getAll);

router.get('/:pid', getOne);

router.post("/", create);

router.put('/:pid', authorization('user'), update);

router.delete('/:pid', authorization('user'), deleteProd);

// router.post('/:pid', authorization('user'), deleteProd);


export default router;

