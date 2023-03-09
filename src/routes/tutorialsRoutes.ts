import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addTutorial, disableTutorial, getTutorials, updateTutorial } from '../controllers/tutorialsController'

const router = Router()

// router.route('/new').post(auth, addTutorial)
router.route('/').post(auth, addTutorial) //tested
// router.route('/disable/:tutorialId').patch(auth,
//   disableTutorial) //tested without auth
router.route('/').get(auth, getTutorials) //tested without auth
// router.route('/update').patch(auth, updateTutorial)   //tested without auth

export default router
