import { RequestHandler } from 'express'
import { createRandomId } from '../utils/utils'
import Cohorts from '../models/cohortModel'
import { addLog } from './logController'

export const addCohort: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateCohort = req.body.number ? await Cohorts.findOne({ number: req.body.number }) : null
      if (duplicateCohort) {
        return res.status(401).json({ error: `C${req.body.number} is already in system` })
      }

      const newCohort = { ...req.body, uid: createRandomId() }

      const cohortCreated = await Cohorts.create(newCohort)

      if (cohortCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'cohort',
          event_type: 'new',
          reference_id: newCohort.uid,
        }
        addLog(log)

        res.status(200).send(cohortCreated)
      } else {
        res.status(401).json({ error: 'Cohort was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateCohort: RequestHandler = async (req, res) => {
  if (req.body && req.params) {
    const { id } = req.params
    try {
      const cohortUpdated = await Cohorts.findOne({ uid: id }, { $set: req.body }, { new: true })

      if (cohortUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'cohort',
          event_type: 'updated',
          reference_id: cohortUpdated.uid,
        }
        addLog(log)

        res.send(cohortUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Invalid data or HTTP method' })
  }
}

export const getCohorts: RequestHandler = async (req, res) => {
  try {
    const allCohorts = await Cohorts.find()
    res.send(allCohorts)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all cohorts' })
  }
}