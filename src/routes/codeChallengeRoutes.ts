import { Router } from 'express'
import { auth } from '../middleware/auth'
import {
  addCodeChallenge,
  disableCodeChallenge,
  getCodeChallenges,
  updateCodeChallenge,
} from '../controllers/codeChallengesController'

const router = Router()

router.route('/').get(auth, getCodeChallenges)
router.route('/').post(auth, addCodeChallenge)
router.route('/disable/:codeChallengeId').patch(auth, disableCodeChallenge)
router.route('/update').patch(auth, updateCodeChallenge)

export default router
