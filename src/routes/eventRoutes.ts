import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addEvent, disableEvent, getEvents, updateEvent, getEvent } from '../controllers/eventsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getEvents)
router.route('/:id').get(auth, getEvent)
router.route('/').post(auth, checkRequestBody, addEvent)
router.route('/disable/:id').patch(auth, checkRequestBody, disableEvent)
router.route('/:id').patch(auth, checkRequestBody, updateEvent)

export default router
