import { RequestHandler } from 'express'

import { createRandomId } from '../../utils/utils'
import Beers from '../../models/practiceAPIs/beerModel'
import { addLog } from '../logController'

export const addBeer: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateBeer = req.body.uid ? await Beers.findOne({ uid: req.body.uid }) : null
      if (duplicateBeer) {
        return res.status(401).json({ error: 'Beer already in system' })
      }

      const newBeer = { ...req.body, uid: createRandomId() }

      const beerCreated = await Beers.create(newBeer)

      if (beerCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'beer',
          event_type: 'new',
          reference_id: newBeer.uid,
        }
        addLog(log)

        res.send('Beer created')
      } else {
        res.status(401).json({ error: 'Beer was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateBeer: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      await Beers.findOneAndUpdate({ beerId: req.body.beerId }, { $set: req.body })
      const beerUpdated = await Beers.findOne({ beerId: req.body.beerId })

      if (beerUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'beer',
          event_type: 'updated',
          reference_id: beerUpdated.uid,
        }
        addLog(log)

        res.send(beerUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getBeers: RequestHandler = async (req, res) => {
  try {
    const allBeers = await Beers.find()
    res.send(allBeers)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Beers' })
  }
}

export const disableBeer: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { beerId } = req.params
    const beerUpdated = await Beers.findOneAndUpdate({ uid: beerId }, { $set: { enabled: false } })

    if (beerUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'beer',
        event_type: 'disabled',
        reference_id: beerUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Beer id ${beerId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
