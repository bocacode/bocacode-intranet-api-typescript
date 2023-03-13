import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addLecture, disableLecture, getLectures, updateLecture } from '../controllers/lecturesController'

const router = Router()

router.route('/').get(auth, getLectures)
router.route('/').post(auth, addLecture)
router.route('/disable/:lectureId').patch(auth, disableLecture)
router.route('/update').patch(auth, updateLecture)

export default router
