import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Labs from '../models/labModel'
import { addLog } from './logController'

export const addLab: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateLab = req.body.uid ? await Labs.findOne({ uid: req.body.uid }) : null
      if (duplicateLab) {
        return res.status(401).json({ error: 'Lab already in system' })
      }

      const newLab = { ...req.body, uid: createRandomId() }

      const labCreated = await Labs.create(newLab)

      if (labCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'lab',
          event_type: 'new',
          reference_id: newLab.uid,
        }
        addLog(log)

        res.send('Lab created')
      } else {
        res.status(401).json({ error: 'Lab was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateLab: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      await Labs.findOneAndUpdate({ labId: req.body.labId }, { $set: req.body })
      const labUpdated = await Labs.findOne({ labId: req.body.labId })

      if (labUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'lab',
          event_type: 'updated',
          reference_id: labUpdated.uid,
        }
        addLog(log)

        res.send(labUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getLabs: RequestHandler = async (req, res) => {
  try {
    const allLabs = await Labs.find()
    res.send(allLabs)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Labs' })
  }
}

export const disableLab: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { labId } = req.params
    const labUpdated = await Labs.findOneAndUpdate({ uid: labId }, { $set: { enabled: false } })

    if (labUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'lab',
        event_type: 'disabled',
        reference_id: labUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Lab id ${labId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
