import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import CodeChallenges from '../models/codeChallengeModel'
import { addLog } from './logController'

export const addCodeChallenge: RequestHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(401).json({ error: 'Invalid HTTP method' })
  try {
    const duplicateCodeChallenge = req.body.uid ? await CodeChallenges.findOne({ uid: req.body.uid }) : null
    if (duplicateCodeChallenge) {
      return res.status(401).json({ error: 'Code Challenge already in system' })
    }

    const newCodeChallenge = { ...req.body, uid: createRandomId(), created_by: req.body.user_id}

    const codeChallengeCreated = await CodeChallenges.create(newCodeChallenge)

    if (codeChallengeCreated) {
      const log = {
        user_id: req.body.user_id,
        model: 'codeChallenge',
        event_type: 'new',
        reference_id: newCodeChallenge.uid,
      }
      addLog(log)

        res.send(codeChallengeCreated)
      } else {
        res.status(401).json({ error: 'Code Challenge was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }

export const updateCodeChallenge: RequestHandler = async (req, res) => {
  if (req.method !== 'PATCH') return res.status(401).json({ error: 'Invalid request method' })
  if (!req.params) return res.status(401).send({ message: 'Unable to update code challenge' })

  try {
    const codeChallengeUpdated = await CodeChallenges.findOneAndUpdate(
      { codeChallengeId: req.params.id },
      { $set: req.body }
    )
    if (codeChallengeUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'codeChallenge',
        event_type: 'updated',
        reference_id: codeChallengeUpdated.uid,
      }
      addLog(log)

      res.send(codeChallengeUpdated)
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

export const getCodeChallenges: RequestHandler = async (req, res) => {
  try {
    const allCodeChallenges = await CodeChallenges.find()
    res.send(allCodeChallenges)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Code Challenges' })
  }
}

export const disableCodeChallenge: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { id } = req.params
    const codeChallengeUpdated = await CodeChallenges.findOneAndUpdate(
      { uid: id },
      { $set: { enabled: false } }
    )

    if (codeChallengeUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'codeChallenge',
        event_type: 'disabled',
        reference_id: codeChallengeUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Code Challenge id ${id} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
