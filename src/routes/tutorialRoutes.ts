import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addTutorial, disableTutorial, getTutorials, getTutorial, updateTutorial } from '../controllers/tutorialsController'

const router = Router()

router.route('/').get(auth, getTutorials)
router.route('/').post(auth, addTutorial)
router.route('/:id').get(auth, getTutorial)
router.route('/disable/:id').patch(auth, disableTutorial)
router.route('/:id').patch(auth, updateTutorial)

export default router
