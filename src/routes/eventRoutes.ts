import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addEvent, disableEvent, getEvents, updateEvent, getEvent } from '../controllers/eventsController'

const router = Router()

router.route('/').get(auth, getEvents)
router.route('/:id').get(auth, getEvent)
router.route('/').post(auth, addEvent)
router.route('/disable/:id').patch(auth, disableEvent)
router.route('/:id').patch(auth, updateEvent)

export default router
