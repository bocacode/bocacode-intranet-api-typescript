import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import News from '../models/newsModel'
import { addLog } from './logController'

// testing
export const addNews: RequestHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(401).json({ error: 'Invalid HTTP method' })
  try {
    const duplicateNews = req.body.uid ? await News.findOne({ uid: req.body.uid }) : null
    if (duplicateNews) {
      return res.status(401).json({ error: 'News already in system' })
    }

    const newNews = { ...req.body, created_by: req.body.user_id, uid: createRandomId() }

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

export const updateNews: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).json({ error: 'Unable to update news' })
  try {
    const { id } = req.params
    const newsUpdated = await News.findOneAndUpdate({ uid: id }, { $set: req.body }, { new: true })

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
}

export const getNewsById: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'ID missing or Access Denied' })
  try {
    const { id } = req.params
    const newsFound = await News.findById(id)
    res.status(200).send(newsFound)
  } catch (err) {
    res.status(500).send({ error: err })
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
    const { id } = req.params
    const newsUpdated = await News.findOneAndUpdate({ uid: id }, { $set: { enabled: false } }, { new: true })

    if (newsUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'news',
        event_type: 'disabled',
        reference_id: newsUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `News article id ${id} has been disabled ` })
    }
    else {
      res.status(404).send({ error: 'No news article found with the provided id' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
