import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addTutorial, disableTutorial, getTutorials, updateTutorial } from '../controllers/tutorialsController'

const router = Router()

router.route('/').get(auth, getTutorials)
// router.route('/new').post(auth, addTutorial)
router.route('/').post(auth, addTutorial)
router.route('/disable/:tutorialId').patch(auth, disableTutorial)
router.route('/update').patch(auth, updateTutorial)

export default router
