import { Router } from 'express'
import { auth } from '../middleware/auth'
import {
  getStudents,
  getStudent,
  addStudent,
  disableStudent,
  updateStudent,
  getStudentsAdminView,
} from '../controllers/studentsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getStudents)
router.route('/adminview').get(auth, getStudentsAdminView)
router.route('/:id').get(auth, getStudent)
router.route('/').post(auth, checkRequestBody, addStudent)
router.route('/:id').patch(auth, checkRequestBody, updateStudent)
router.route('/disable/:id').patch(auth, checkRequestBody, disableStudent)

export default router
