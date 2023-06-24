import { Router } from 'express'
import { auth } from '../middleware/auth'
import {
  addCodeChallenge,
  disableCodeChallenge,
  getCodeChallenges,
  updateCodeChallenge,
} from '../controllers/codeChallengesController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getCodeChallenges)
router.route('/').post(auth, checkRequestBody, addCodeChallenge)
router.route('/disable/:codeChallengeId').patch(auth, checkRequestBody, disableCodeChallenge)
router.route('/update').patch(auth, checkRequestBody, updateCodeChallenge)

export default router
