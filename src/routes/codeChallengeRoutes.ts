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
router.route('/disable/:id').patch(auth, disableCodeChallenge)
router.route('/:id').patch(auth, updateCodeChallenge)

export default router
