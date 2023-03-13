import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Tutorials from '../models/tutorialModel'
import { addLog } from './logController'

export const addTutorial: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateTutorial = req.body.uid ? await Tutorials.findOne({ uid: req.body.uid }) : null
      if (duplicateTutorial) {
        return res.status(401).json({ error: 'Tutorial already in system' })
      }

      const newTutorial = { ...req.body, uid: createRandomId() }

      const tutorialCreated = await Tutorials.create(newTutorial)

      if (tutorialCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'tutorial',
          event_type: 'new',
          reference_id: newTutorial.uid,
        }
        addLog(log)

        res.send('Tutorial created')
      } else {
        res.status(401).json({ error: 'Tutorial was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateTutorial: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      const tutorialUpdated = await Tutorials.findOneAndUpdate({ tutorialId: req.body.tutorialId }, { $set: req.body })

      if (tutorialUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'tutorial',
          event_type: 'updated',
          reference_id: tutorialUpdated.uid,
        }
        addLog(log)

        res.send(tutorialUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getTutorials: RequestHandler = async (req, res) => {
  try {
    const allTutorials = await Tutorials.find()
    res.send(allTutorials)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Tutorials' })
  }
}

export const disableTutorial: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { tutorialId } = req.params
    const tutorialUpdated = await Tutorials.findOneAndUpdate({ uid: tutorialId }, { $set: { enabled: false } })

    if (tutorialUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'tutorial',
        event_type: 'disabled',
        reference_id: tutorialUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Tutorial id ${tutorialId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
