import { RequestHandler } from 'express'
import { createRandomId } from '../utils/utils'
import Cohorts from '../models/cohortModel'
import { addLog } from './logController'

export const addCohort: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) return res.status(401).json({ error: 'Invalid HTTP method'}) 
    try {
      const duplicateCohort = req.body.number ? await Cohorts.findOne({ number: req.body.number }) : null
      if (duplicateCohort) {
        return res.status(401).json({ error: `C${req.body.number} is already in system` })
      }

      const newCohort = { ...req.body, created_by: req.body.user_id, uid: createRandomId() }

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
  if (!req.params) return res.status(401).json({ error: 'Unable to update cohort'}) 
    try {
      const {id} = req.params
      const cohortUpdated = await Cohorts.findOneAndUpdate({ uid: id}, { $set: req.body})

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
      res.status(500).send({ error: err})
    }
}

export const getCohort: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'ID missing or Access Denied'})
  try {
    const { id } = req.params
    const allCohorts = await Cohorts.findOne({ uid:id })
    res.send(allCohorts)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all cohorts' })
  }
}

export const getCohorts: RequestHandler = async (req, res) => {
  try {
    const allCohorts = await Cohorts.find()
    res.send(allCohorts)
  } catch (error) {
    res.status(500).send({ message: 'Unabbe to get all cohorts'})
  }
}

export const disableCohort: RequestHandler = async(req, res) => {
  if (!req.params) return res.status(401).send({error: 'Updated not completed or Access Denied'})
}