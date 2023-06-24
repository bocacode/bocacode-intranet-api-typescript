import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import CodeChallenges from '../models/codeChallengeModel'
import { addLog } from './logController'

export const addCodeChallenge: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateCodeChallenge = req.body.uid ? await CodeChallenges.findOne({ uid: req.body.uid }) : null
      if (duplicateCodeChallenge) {
        return res.status(401).json({ error: 'Code Challenge already in system' })
      }

      const newCodeChallenge = { ...req.body, uid: createRandomId() }

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
}

export const updateCodeChallenge: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      const codeChallengeUpdated = await CodeChallenges.findOneAndUpdate(
        { codeChallengeId: req.body.codeChallengeId },
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
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
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
    const { codeChallengeId } = req.params
    const codeChallengeUpdated = await CodeChallenges.findOneAndUpdate(
      { uid: codeChallengeId },
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
      res.status(200).send({ success: `Code Challenge id ${codeChallengeId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
