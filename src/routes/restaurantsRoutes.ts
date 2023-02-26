import { Router } from 'express'
// import { auth } from '../middleware/auth'
import {
  addRestaurant,
  disableRestaurant,
  getRestaurants,
  updateRestaurant,
} from '../controllers/restaurantsController'

const router = Router()

// router.route('/new').post(auth, addRestaurant)
router.route('/').post(addRestaurant)
// router.route('/disable/:dealId').patch(auth, disableRestaurant)
// router.route('/').get(auth, getRestaurants)
// router.route('/update').patch(auth, updateRestaurant)

export default router
