import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addWellness, disableWellness, getWellness, updateWellness } from '../controllers/wellnessController'

const router = Router()

router.route('/').get(auth, getWellness)
// router.route('/new').post(auth, addWellness)
router.route('/').post(auth, addWellness)
router.route('/disable/:wellnessId').patch(auth, disableWellness)
router.route('/update').patch(auth, updateWellness)

export default router
