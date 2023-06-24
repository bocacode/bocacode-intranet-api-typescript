import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addLab, disableLab, getLabs, updateLab } from '../controllers/labsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getLabs)
router.route('/').post(auth, checkRequestBody, addLab)
router.route('/disable/:id').patch(auth, checkRequestBody, disableLab)
router.route('/:id').patch(auth, checkRequestBody, updateLab)

export default router
