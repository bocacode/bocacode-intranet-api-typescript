import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addEvent, disableEvent, getEvents, updateEvent } from '../controllers/eventsController'

const router = Router()

router.route('/').get(auth, getEvents)
// router.route('/new').post(auth, addTutorial)
router.route('/').post(auth, addEvent)
router.route('/disable/:eventId').patch(auth, disableEvent)
router.route('/update').patch(auth, updateEvent)

export default router
