import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addJob, disableJob, getJobs, getJob, updateJob } from '../controllers/jobsController'

const router = Router()

router.route('/').get(auth, getJobs)
router.route('/:id').get(auth, getJob)
router.route('/').post(auth, addJob)
router.route('/disable/:id').patch(auth, disableJob)
router.route('/update/:id').patch(auth, updateJob)

export default router
