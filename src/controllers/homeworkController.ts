import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Homeworks from '../models/homeworkModel'
import { addLog } from './logController'

export const addHomework: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateHomework = req.body.uid ? await Homeworks.findOne({ uid: req.body.uid }) : null
      if (duplicateHomework) {
        return res.status(401).json({ error: 'Homework already in system' })
      }

      const newHomework = { ...req.body, uid: createRandomId(), created_by: req.body.user_id }

      const homeworkCreated = await Homeworks.create(newHomework)

      if (homeworkCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'homework',
          event_type: 'new',
          reference_id: newHomework.uid,
        }
        addLog(log)

        res.send(homeworkCreated)
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
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ message: 'Unable to update Lecture' })

  if (req.body) {
    try {
      const homeworkUpdated = await Homeworks.findOneAndUpdate({ uid: req.params.id }, { $set: req.body })

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

export const getHomeworks: RequestHandler = async (req, res) => {
  console.log('test here ')

  try {
    const allHomework = await Homeworks.find()
    res.send(allHomework)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Homework' })
  }
}

export const disableHomework: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { homeworkId } = req.params
    const homeworkUpdated = await Homeworks.findOneAndUpdate({ uid: homeworkId }, { $set: { enabled: false } })

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
