import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Lectures from '../models/lectureModel'
import { addLog } from './logController'

export const addLecture: RequestHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(401).json({ error: 'Invalid request method' })
  
  try {
    const duplicateLecture = req.body.uid ? await Lectures.findOne({ uid: req.body.uid }) : null
    if (duplicateLecture) {
      return res.status(401).json({ error: 'Lecture already in system' })
    }

    const { user_id, ...restReqBody } = req.body;

    const newLecture = { ...restReqBody, uid: createRandomId(), created_by: user_id }

    const lectureCreated = await Lectures.create(newLecture)

    if (lectureCreated) {
      const log = {
        user_id,
        model: 'lecture',
        event_type: 'new',
        reference_id: newLecture.uid,
      }
      addLog(log)

      res.send(lectureCreated)
    } else {
      res.status(401).json({ error: 'Lecture was not created' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Invalid data or HTTP method' })
  }
}

export const updateLecture: RequestHandler = async (req, res) => {
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ message: 'Unable to update Lecture' })
  
  try {
    const { user_id, ...restReqBody } = req.body

    const lectureUpdated = await Lectures.findOneAndUpdate({ uid: req.params.id }, { $set: {...restReqBody, created_by: user_id} }, {new: true})

    if (lectureUpdated) {
      const log = {
        user_id,
        model: 'lecture',
        event_type: 'updated',
        reference_id: lectureUpdated.uid,
      }
      addLog(log)

      res.send(lectureUpdated)
    } else {
      res.status(401).json({ error: 'Lecture was not updated' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err })
  }
}

export const getLectures: RequestHandler = async (req, res) => {
  try {
    const allLectures = await Lectures.find()
    res.send(allLectures)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Lectures' })
  }
}

export const getLecture: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ message: 'Unable to get Lecture' })

  try {
    const lecture = await Lectures.findOne({ uid: req.params.lectureId })
    res.send(lecture)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get Lecture' })
  }
}

export const disableLecture: RequestHandler = async (req, res) => {
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { id } = req.params
    const { user_id } = req.body
    const lectureUpdated = await Lectures.findOneAndUpdate({ uid: id }, { $set: { enabled: false } }, { new: true })

    if (lectureUpdated) {
      const log = {
        user_id,
        model: 'lecture',
        event_type: 'disabled',
        reference_id: lectureUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Lecture id ${id} has been disabled ` })
    } else {
      res.status(401).json({ error: 'Lecture was not disabled' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
