import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addNews, disableNews, getNews, getNewsById, updateNews } from '../controllers/newsController'

const router = Router()

router.route('/').get(auth, getNews)
router.route('/:id').get(auth, getNewsById)
router.route('/').post(auth, addNews)
router.route('/disable/:id').patch(auth, disableNews)
router.route('/update/:id').patch(auth, updateNews)

export default router
