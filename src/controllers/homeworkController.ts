import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Homework from '../models/homeworkModel'
import { addLog } from './logController'

export const addHomework: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateHomework = req.body.uid ? await Homework.findOne({ uid: req.body.uid }) : null
      if (duplicateHomework) {
        return res.status(401).json({ error: 'Homework already in system' })
      }

      const newHomework = { ...req.body, uid: createRandomId() }

      const homeworkCreated = await Homework.create(newHomework)

      if (homeworkCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'homework',
          event_type: 'new',
          reference_id: newHomework.uid,
        }
        addLog(log)

        res.send('Homework created')
      } else {
        res.status(401).json({ error: 'Homework was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateHomework: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      await Homework.findOneAndUpdate({ homeworkId: req.body.homeworkId }, { $set: req.body })
      const homeworkUpdated = await Homework.findOne({ homeworkId: req.body.homeworkId })

      if (homeworkUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'homework',
          event_type: 'updated',
          reference_id: homeworkUpdated.uid,
        }
        addLog(log)

        res.send(homeworkUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getHomework: RequestHandler = async (req, res) => {
  try {
    const allHomework = await Homework.find()
    res.send(allHomework)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Homework' })
  }
}

export const disableHomework: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { homeworkId } = req.params
    const homeworkUpdated = await Homework.findOneAndUpdate({ uid: homeworkId }, { $set: { enabled: false } })

    if (homeworkUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'homework',
        event_type: 'disabled',
        reference_id: homeworkUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Homework id ${homeworkId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
