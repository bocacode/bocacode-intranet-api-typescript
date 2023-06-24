import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addEvent, disableEvent, getEvents, updateEvent } from '../controllers/eventsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getEvents)
router.route('/').post(auth, checkRequestBody, addEvent)
router.route('/disable/:eventId').patch(auth, checkRequestBody, disableEvent)
router.route('/update').patch(auth, checkRequestBody, updateEvent)

export default router
