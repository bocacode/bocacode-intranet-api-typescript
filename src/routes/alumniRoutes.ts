import { Router } from 'express'
import { auth } from '../middleware/auth'
import {
  addAlumni,
  disableAlumni,
  getAlumnis,
  getAlumni,
  updateAlumni,
} from '../controllers/alumniController'

const router = Router()

router.route('/').get(auth, getAlumnis)
router.route('/:id').get(auth, getAlumni)
router.route('/').post(auth, addAlumni)
router.route('/disable/:id').patch(auth, disableAlumni)
router.route('/:id').patch(auth, updateAlumni)

export default router
