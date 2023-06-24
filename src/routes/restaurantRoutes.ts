import { Router } from 'express'
import { auth } from '../middleware/auth'
import {
  addRestaurant,
  disableRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  updateRestaurantRating,
} from '../controllers/restaurantsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getRestaurants)
router.route('/:id').get(auth, getRestaurant)
router.route('/').post(auth, checkRequestBody, addRestaurant)
router.route('/disable/:id').patch(auth, checkRequestBody, disableRestaurant)
router.route('/:id').patch(auth, checkRequestBody, updateRestaurant)
router.route('/rating/:id').patch(auth, checkRequestBody, updateRestaurantRating)


export default router
