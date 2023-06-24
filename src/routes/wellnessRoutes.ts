import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addWellness, disableWellness, getAllWellness, getOneWellness, updateWellness } from '../controllers/wellnessController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getAllWellness)
router.route('/:id').get(auth, getOneWellness)
router.route('/').post(auth, checkRequestBody, addWellness)
router.route('/disable/:id').patch(auth,  checkRequestBody, disableWellness)
router.route('/:id').patch(auth, checkRequestBody, updateWellness)

export default router
