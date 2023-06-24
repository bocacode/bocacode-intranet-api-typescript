import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Wellness from '../models/wellnessModel'
import { addLog } from './logController'

export const addWellness: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateWellness = req.body.uid ? await Wellness.findOne({ uid: req.body.uid }) : null
      if (duplicateWellness) {
        return res.status(401).json({ error: 'Wellness already in system' })
      }

      const newWellness = { ...req.body, uid: createRandomId() }

      const wellnessCreated = await Wellness.create(newWellness)

      if (wellnessCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'wellness',
          event_type: 'new',
          reference_id: newWellness.uid,
        }
        addLog(log)

        res.send('Wellness created')
      } else {
        res.status(401).json({ error: 'Wellness was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateWellness: RequestHandler = async (req, res) => {
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ message: 'Unable to update Lecture' })

  if (req.body) {
    try {
      const wellnessUpdated = await Wellness.findOneAndUpdate({ wellnessId: req.params.wellnessId }, { $set: req.body })

      if (wellnessUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'wellness',
          event_type: 'updated',
          reference_id: wellnessUpdated.uid,
        }
        addLog(log)

        res.send(wellnessUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getWellness: RequestHandler = async (req, res) => {
  try {
    const allWellness = await Wellness.find()
    res.send(allWellness)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Wellness' })
  }
}

export const disableWellness: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { wellnessId } = req.params
    const wellnessUpdated = await Wellness.findOneAndUpdate({ uid: wellnessId }, { $set: { enabled: false } })

    if (wellnessUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'wellness',
        event_type: 'disabled',
        reference_id: wellnessUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Wellness id ${wellnessId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
