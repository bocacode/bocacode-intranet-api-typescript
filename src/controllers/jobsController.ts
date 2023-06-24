import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Job from '../models/jobModel'
import { addLog } from './logController'

export const addJob: RequestHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(401).json({ error: 'Invalid HTTP method' })
  if (!req.body || !req.body?.user_id) return res.status(401).json({ error: 'Invalid request body' })
  try {
    const duplicateJob = req.body.uid ? await Job.findOne({ uid: req.body.uid }) : null
    if (duplicateJob) {
      return res.status(401).json({ error: 'Job already in system' })
    }

    const newJob = { ...req.body, created_by: req.body.user_id, uid: createRandomId() }

    const jobCreated = await Job.create(newJob)

    if (jobCreated) {
      const log = {
        user_id: req.body.user_id,
        model: 'job',
        event_type: 'new',
        reference_id: newJob.uid,
      }
      addLog(log)

      res.send(jobCreated)
    } else {
      res.status(401).json({ error: 'Job was not created' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Invalid data or HTTP method' })
  }
}

export const updateJob: RequestHandler = async (req, res) => {
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ message: 'Unable to update Job' })

  if (req.body) {
    try {
      const jobUpdated = await Job.findOneAndUpdate({ uid: req.params.id }, { $set: req.body })

      if (jobUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'job',
          event_type: 'updated',
          reference_id: jobUpdated.uid,
        }
        addLog(log)

        res.send(jobUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }
}

export const getJobs: RequestHandler = async (req, res) => {
  try {
    const allJobs = await Job.find()
    res.send(allJobs)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Jobs' })
  }
}

export const getJob: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'ID missing or Access Denied' })
    try {
      const {id} = req.params
      const itemFound = await Job.findOne({uid: id})
      res.status(200).send(itemFound)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  }

export const disableJob: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).json({ error: 'Unable to update job' })
  if (!req.body || !req.body?.user_id) return res.status(401).json({ error: 'Invalid request body' })
  try {
    const { id } = req.params
    console.log(req.params)
    const jobUpdated = await Job.findOneAndUpdate({ uid: id }, { $set: { enabled: false } })

    if (jobUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'job',
        event_type: 'disabled',
        reference_id: jobUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Job id ${id} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
