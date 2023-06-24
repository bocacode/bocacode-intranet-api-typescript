import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addLab, disableLab, getLabs, updateLab } from '../controllers/labsController'

const router = Router()

router.route('/').get(auth, getLabs)
router.route('/').post(auth, addLab)
router.route('/disable/:id').patch(auth, disableLab)
router.route('/:id').patch(auth, updateLab)

export default router
