import {Router} from "express"
import { cartViews, cartViewsID  } from "../controller/cartsviews.controller.js"

const router = Router()

router.get('/', cartViews)

router.get('/:cid', cartViewsID )

export default router