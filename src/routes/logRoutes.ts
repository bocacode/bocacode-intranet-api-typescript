import { Router } from 'express'
import { auth } from '../middleware/auth'
import { getLogs, getUserLogs } from '../controllers/logController'

const router = Router()

router.route('/').get(auth, getLogs)

router.route('/:email').get(auth, getUserLogs)

export default router
