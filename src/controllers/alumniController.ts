import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Alumni from '../models/alumniModel'
import { addLog } from './logController'

export const addAlumni: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateAlumni = req.body.uid ? await Alumni.findOne({ uid: req.body.uid }) : null
      if (duplicateAlumni) {
        return res.status(401).json({ error: 'Alumni already in system' })
      }

      const newAlumni = { ...req.body, uid: createRandomId() }

      const alumniCreated = await Alumni.create(newAlumni)

      if (alumniCreated) {
        const log = {
          user_id: req.body.created_by,
          model: 'alumni',
          event_type: 'new',
          reference_id: newAlumni.uid,
        }
        addLog(log)

        res.status(200).send(alumniCreated)
      } else {
        res.status(401).json({ error: 'Deal was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateAlumni: RequestHandler = async (req, res) => {
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ message: 'Unable to update Alumni' })

  if (req.body) {
    try {
      const alumniUpdated = await Alumni.findOneAndUpdate({ uid: req.params.id }, { $set: req.body })

      if (alumniUpdated) {
        const log = {
          user_id: req.body.created_by,
          model: 'alumni',
          event_type: 'updated',
          reference_id: alumniUpdated.uid,
        }
        addLog(log)

        res.status(200).send(alumniUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getAlumnis: RequestHandler = async (req, res) => {
  try {
    const allAlumnis = await Alumni.find()
    res.send(allAlumnis)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all alumnis' })
  }
}

export const getAlumni: RequestHandler = async (req, res) => {
  if (req.params) {
    const { id } = req.params
    try {
      const userFound = await Alumni.findById(id)
      res.status(200).send(userFound)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const disableAlumni: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { id } = req.params
    const alumniUpdated = await Alumni.findOneAndUpdate({ uid: id }, { $set: { enabled: false } })

    if (alumniUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'alumni',
        event_type: 'disabled',
        reference_id: alumniUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Alumni id ${id} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
