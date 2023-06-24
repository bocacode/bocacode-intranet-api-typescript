import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addWellness, disableWellness, getWellness, updateWellness } from '../controllers/wellnessController'

const router = Router()

router.route('/').get(auth, getWellness)
router.route('/').post(auth, addWellness)
router.route('/disable/:id').patch(auth, disableWellness)
router.route('/:id').patch(auth, updateWellness)

export default router
