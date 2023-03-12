import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addLab, disableLab, getLabs, updateLab } from '../controllers/labsController'

const router = Router()

router.route('/').get(auth, getLabs)
// router.route('/new').post(auth, addLab)
router.route('/').post(auth, addLab)
router.route('/disable/:labId').patch(auth, disableLab)
router.route('/update').patch(auth, updateLab)

export default router
