import { Router } from 'express'
// import { auth } from '../middleware/auth'
import {
  addRestaurant,
  disableRestaurant,
  getRestaurants,
  updateRestaurant,
} from '../controllers/restaurantsController'

const router = Router()

router.route('/').get(getRestaurants)
router.route('/').post(addRestaurant)
// router.route('/new').post(auth, addRestaurant)
// router.route('/disable/:dealId').patch(auth, disableRestaurant)
// router.route('/update').patch(auth, updateRestaurant)

export default router
