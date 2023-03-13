import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addHomework, disableHomework, getHomeworks, updateHomework } from '../controllers/homeworkController'

const router = Router()

router.route('/').get(auth, getHomeworks)
router.route('/').post(auth, addHomework)
router.route('/disable/:homeworkId').patch(auth, disableHomework)
router.route('/update').patch(auth, updateHomework)

export default router
