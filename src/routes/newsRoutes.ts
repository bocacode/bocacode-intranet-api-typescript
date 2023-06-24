import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addNews, disableNews, getNews, getNewsById, updateNews } from '../controllers/newsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getNews)
router.route('/:newsId').get(auth, getNewsById)
router.route('/').post(auth, checkRequestBody, addNews)
router.route('/disable/:newsId').patch(auth, checkRequestBody, disableNews)
router.route('/update/:newsId').patch(auth, checkRequestBody, updateNews)

export default router
