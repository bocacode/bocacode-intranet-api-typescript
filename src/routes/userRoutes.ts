import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addUser, getUser, getUsers, login, updateUser } from '../controllers/usersController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/:id').get(auth, getUser)
router.route('/signup').post(checkRequestBody, addUser)
router.route('/login').post(checkRequestBody, login)
router.route('/signup').post(checkRequestBody, addUser)
router.route('/login').post(checkRequestBody, login)
router.route('/:id').patch(auth, checkRequestBody, updateUser)

export default router
