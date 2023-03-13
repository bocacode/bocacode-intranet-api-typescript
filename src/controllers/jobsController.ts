import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Job from '../models/jobModel'
import { addLog } from './logController'

export const addJob: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateJob = req.body.uid ? await Job.findOne({ uid: req.body.uid }) : null
      if (duplicateJob) {
        return res.status(401).json({ error: 'Job already in system' })
      }

      const newJob = { ...req.body, uid: createRandomId() }

      const jobCreated = await Job.create(newJob)

      if (jobCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'job',
          event_type: 'new',
          reference_id: newJob.uid,
        }
        addLog(log)

        res.send('Job created')
      } else {
        res.status(401).json({ error: 'Job was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateJob: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      const jobUpdated = await Job.findOneAndUpdate({ jobId: req.body.jobId }, { $set: req.body })

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
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
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

export const disableJob: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { jobId } = req.params
    const jobUpdated = await Job.findOneAndUpdate({ uid: jobId }, { $set: { enabled: false } })

    if (jobUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'job',
        event_type: 'disabled',
        reference_id: jobUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Job id ${jobId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
