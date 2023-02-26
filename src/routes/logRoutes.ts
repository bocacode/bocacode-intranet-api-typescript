import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { getLogs } from '../controllers/logController.js'

const router = Router()

router.route('/').get(auth, getLogs)

export default router
