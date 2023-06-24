import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addLecture, disableLecture, getLectures, getLecture, updateLecture } from '../controllers/lecturesController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getLectures)
router.route('/:id').get(auth, getLecture)
router.route('/').post(auth, checkRequestBody, addLecture)
router.route('/disable/:id').patch(auth, checkRequestBody, disableLecture)
router.route('/:id').patch(auth, checkRequestBody, updateLecture)

export default router
