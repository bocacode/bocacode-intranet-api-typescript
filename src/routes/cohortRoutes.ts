import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addCohort, disableCohort, getCohort, getCohorts, updateCohort } from '../controllers/cohortController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getCohorts)
router.route('/:id').get(auth, getCohort)
router.route('/').post(auth, checkRequestBody, addCohort)
router.route('/disable/:id').delete(auth, checkRequestBody, disableCohort)
router.route('/:id').patch(auth, checkRequestBody, updateCohort)

export default router