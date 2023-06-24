import { Router } from 'express'
import { auth } from '../middleware/auth'
import {
  addRestaurant,
  disableRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
} from '../controllers/restaurantsController'

const router = Router()

router.route('/').get(auth, getRestaurants)
router.route('/:id').get(auth, getRestaurant)
router.route('/').post(auth, addRestaurant)
router.route('/disable/:id').patch(auth, disableRestaurant)
router.route('/:id').patch(auth, updateRestaurant)

export default router
