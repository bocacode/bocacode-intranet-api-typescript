import { Router } from 'express'
// import { auth } from '../middleware/auth'
import { addHomework, disableHomework, getHomework, updateHomework } from '../controllers/homeworkController'

const router = Router()

// router.route('/new').post(auth, addHomework)
router.route('/').post(addHomework) //tested
// router.route('/disable/:homeworkId').patch(auth,
//   disableHomework) //tested without auth
// router.route('/').get(auth, getHomework) //tested without auth
// router.route('/update').patch(auth, updateHomework)   //tested without auth

export default router
