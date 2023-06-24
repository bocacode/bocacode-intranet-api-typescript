import { Router } from 'express'
import { auth } from '../middleware/auth'
import { addNews, disableNews, getNews, getAllNews, updateNews } from '../controllers/newsController'
import { checkRequestBody } from '../middleware/checkBody'

const router = Router()

router.route('/').get(auth, getAllNews)
router.route('/:id').get(auth, getNews)
router.route('/').post(auth, checkRequestBody, addNews)
router.route('/disable/:id').patch(auth, checkRequestBody, disableNews)
router.route('/:id').patch(auth, checkRequestBody, updateNews)

export default router
