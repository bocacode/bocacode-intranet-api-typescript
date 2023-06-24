import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addLab, disableLab, getLabs, updateLab } from '../controllers/labsController'

const router = Router()

router.route('/').get(auth, getLabs)
router.route('/').post(auth, addLab)
router.route('/disable/:labId').patch(auth, disableLab)
router.route('/:labId').patch(auth, updateLab)

export default router
