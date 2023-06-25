import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Wellness from '../models/wellnessModel'
import { addLog } from './logController'

export const addWellness: RequestHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(401).json({ error: 'Invalid request method' })

  try {
    const duplicateWellness = req.body.uid ? await Wellness.findOne({ uid: req.body.uid }) : null
    if (duplicateWellness) {
      return res.status(401).json({ error: 'Wellness already in system' })
    }

    const { user_id, ...restReqBody } = req.body

    const newWellness = { ...restReqBody, uid: createRandomId(), created_by: user_id }

    const wellnessCreated = await Wellness.create(newWellness)

    if (wellnessCreated) {
      const log = {
        user_id,
        model: 'wellness',
        event_type: 'new',
        reference_id: newWellness.uid,
      }
      addLog(log)

      res.send(wellnessCreated)
    } else {
      res.status(401).json({ error: 'Wellness was not created' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Invalid data or HTTP method' })
  }
}

export const updateWellness: RequestHandler = async (req, res) => {
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ message: 'Unable to update Wellness' })

  try {
    const { user_id, ...restReqBody } = req.body
    const wellnessUpdated = await Wellness.findOneAndUpdate({ uid: req.params.id }, { $set: { ...restReqBody, created_by: user_id } },  { new: true })

    if (wellnessUpdated) {
      const log = {
        user_id,
        model: 'wellness',
        event_type: 'updated',
        reference_id: wellnessUpdated.uid,
      }
      addLog(log)

      res.send(wellnessUpdated)
    } else {
      res.status(401).send({ message: 'Unable to update Wellness' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

export const getAllWellness: RequestHandler = async (req, res) => {
  try {
    const allWellness = await Wellness.find()
    res.send(allWellness)
  } catch (error) {
    res.status(500).send({ error: 'Unable to get all Wellness' })
  }
}

export const getOneWellness: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { id } = req.params
    const allWellness = await Wellness.findOne({ uid: id })
    res.send(allWellness)
  } catch (error) {
    res.status(500).send({ error: 'Unable to get all Wellness' })
  }
}

export const disableWellness: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { id } = req.params
    const { user_id } = req.body
    const wellnessUpdated = await Wellness.findOneAndUpdate({ uid: id }, { $set: { enabled: false } })

    if (wellnessUpdated) {
      const log = {
        user_id,
        model: 'wellness',
        event_type: 'disabled',
        reference_id: wellnessUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ message: `Wellness id ${id} has been disabled ` })
    } else {
      res.status(401).json({ error: 'Wellness was not updated' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
