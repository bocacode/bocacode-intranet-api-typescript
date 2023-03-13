import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import News from '../models/newsModel'
import { addLog } from './logController'

export const addNews: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateNews = req.body.uid ? await News.findOne({ uid: req.body.uid }) : null
      if (duplicateNews) {
        return res.status(401).json({ error: 'News already in system' })
      }

      const newNews = { ...req.body, uid: createRandomId() }

      const newsCreated = await News.create(newNews)

      if (newsCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'news',
          event_type: 'new',
          reference_id: newNews.uid,
        }
        addLog(log)

        res.send('News article created')
      } else {
        res.status(401).json({ error: 'News article was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateNews: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      const newsUpdated = await News.findOneAndUpdate({ newsId: req.body.newsId }, { $set: req.body })

      if (newsUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'news',
          event_type: 'updated',
          reference_id: newsUpdated.uid,
        }
        addLog(log)

        res.send(newsUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getNews: RequestHandler = async (req, res) => {
  try {
    const allNews = await News.find()
    res.send(allNews)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all News' })
  }
}

export const disableNews: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { newsId } = req.params
    const newsUpdated = await News.findOneAndUpdate({ uid: newsId }, { $set: { enabled: false } })

    if (newsUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'news',
        event_type: 'disabled',
        reference_id: newsUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `News article id ${newsId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
