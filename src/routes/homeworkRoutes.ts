import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addHomework, disableHomework, getHomeworks, updateHomework } from '../controllers/homeworkController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getHomeworks)
router.route('/').post(auth, checkRequestBody, addHomework)
router.route('/disable/:homeworkId').patch(auth, checkRequestBody, disableHomework)
router.route('/update').patch(auth, checkRequestBody, updateHomework)

export default router
