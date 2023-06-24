import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addJob, disableJob, getJobs, getJob, updateJob } from '../controllers/jobsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getJobs)
router.route('/:id').get(auth, getJob)
router.route('/').post(auth, checkRequestBody, addJob)
router.route('/disable/:id').patch(auth, checkRequestBody, disableJob)
router.route('/:id').patch(auth, checkRequestBody, updateJob)

export default router
