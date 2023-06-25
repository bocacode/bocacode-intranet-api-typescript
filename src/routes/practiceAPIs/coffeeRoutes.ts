import { Router } from "express";
import { auth } from "../../middleware/auth";
import { addCoffee, disableCoffee, getCoffee, getCoffees, updateCoffee } from "../../controllers/practiceAPIs/coffeesController";
import { checkRequestBody } from "../../middleware/checkBody";

const router = Router()

router.route('/').get(auth, getCoffees)
router.route('/:id').get(auth, getCoffee)
router.route('/').post(auth, checkRequestBody, addCoffee)
router.route('/disable/:coffeeId').patch(auth, checkRequestBody, disableCoffee)
router.route('/:id').patch(auth, checkRequestBody, updateCoffee)

export default router