import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addNews, disableNews, getNews, updateNews } from '../controllers/newsController'

const router = Router()

router.route('/new').post(auth, addNews)
router.route('/').post(auth, addNews)
router.route('/disable/:newsId').patch(auth, disableNews)
router.route('/').get(auth, getNews)
router.route('/update').patch(auth, updateNews)

export default router
