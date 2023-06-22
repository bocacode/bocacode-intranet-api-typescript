import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addUser, getUser, getUsers, login, updateUser } from '../controllers/usersController'

const router = Router()

router.route('/signup').post(addUser)
router.route('/login').post(login)
router.route('/update').patch(auth, updateUser)
router.route('/:id').get(auth, getUser)
router.route('/').get(auth, getUsers)

export default router
