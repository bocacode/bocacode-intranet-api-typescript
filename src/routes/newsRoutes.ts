import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addNews, disableNews, getNews, getNewsById, updateNews } from '../controllers/newsController'

const router = Router()

router.route('/').get(auth, getNews)
router.route('/:newsId').get(auth, getNewsById)
router.route('/').post(auth, addNews)
router.route('/disable/:newsId').patch(auth, disableNews)
router.route('/update').patch(auth, updateNews)

export default router
