import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addTutorial, disableTutorial, getTutorials, getTutorial, updateTutorial } from '../controllers/tutorialsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getTutorials)
router.route('/:id').get(auth, getTutorial)
router.route('/').post(auth, checkRequestBody, addTutorial)
router.route('/disable/:id').patch(auth, checkRequestBody, disableTutorial)
router.route('/:id').patch(auth, checkRequestBody, updateTutorial)

export default router
