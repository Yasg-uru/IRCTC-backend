import express from "express"
import { create_Train, searchtrainbyorigintodestination } from "../controller/Train.controller.js"
const router=express.Router()

router.route('/create').post(create_Train)
router.route('/search').get(searchtrainbyorigintodestination)
export default router