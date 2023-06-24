import { Router } from 'express'
import { auth } from '../middleware/auth'
import {
  addAlumni,
  disableAlumni,
  getAlumnis,
  getAlumni,
  updateAlumni,
} from '../controllers/alumniController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getAlumnis)
router.route('/:id').get(auth, getAlumni)
router.route('/').post(auth, checkRequestBody, addAlumni)
router.route('/disable/:id').patch(auth,checkRequestBody, disableAlumni)
router.route('/update').patch(auth, checkRequestBody, updateAlumni)

export default router
