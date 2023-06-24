import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addWellness, disableWellness, getWellness, updateWellness } from '../controllers/wellnessController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getWellness)
router.route('/').post(auth, checkRequestBody, addWellness)
router.route('/disable/:wellnessId').patch(auth, checkRequestBody, disableWellness)
router.route('/update').patch(auth, checkRequestBody, updateWellness)

export default router
