import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Restaurant from '../models/restaurantModel'
import { addLog } from './logController'

export const addRestaurant: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateRestaurant = req.body.uid ? await Restaurant.findOne({ uid: req.body.uid }) : null
      if (duplicateRestaurant) {
        return res.status(401).json({ error: 'Property already in system' })
      }

      const newRestaurant = { ...req.body, uid: createRandomId() }

      const restaurantCreated = await Restaurant.create(newRestaurant)

      if (restaurantCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'deal',
          event_type: 'new',
          reference_id: newRestaurant.uid,
        }
        addLog(log)

        res.send('Restaurant created')
      } else {
        res.status(401).json({ error: 'Deal was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateRestaurant: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      const restaurantUpdated = await Restaurant.findOneAndUpdate(
        { restaurantId: req.body.restaurantId },
        { $set: req.body }
      )

      if (restaurantUpdated) {
        const log = {
          user_id: req.body.realtorId,
          model: 'property',
          event_type: 'updated',
          reference_id: restaurantUpdated.uid,
        }
        addLog(log)

        res.send(restaurantUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getRestaurants: RequestHandler = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.find()
    res.send(allRestaurants)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all restaurants' })
  }
}

export const disableRestaurant: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { uid } = req.params
    const restaurantUpdated = await Restaurant.findOneAndUpdate({ uid: uid }, { $set: { enabled: false } })

    if (restaurantUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'deal',
        event_type: 'disabled',
        reference_id: restaurantUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Restaurant id ${uid} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
