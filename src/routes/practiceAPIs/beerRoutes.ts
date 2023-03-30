import { Router } from 'express'
import { auth } from '../../middleware/auth'
import { addBeer, disableBeer, getBeers, updateBeer } from '../../controllers/practiceAPIs/beersController'

const router = Router()

router.route('/').get(auth, getBeers)
router.route('/').post(auth, addBeer)
router.route('/disable/:beerId').patch(auth, disableBeer)
router.route('/update').patch(auth, updateBeer)

export default router
