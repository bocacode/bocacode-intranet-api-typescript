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

      const newRestaurant = { ...req.body, created_by: req.body.user_id, uid: createRandomId() }

      const restaurantCreated = await Restaurant.create(newRestaurant)

      if (restaurantCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'restaurant',
          event_type: 'new',
          reference_id: newRestaurant.uid,
        }
        addLog(log)

        res.status(200).send(restaurantCreated)
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
  const { id } = req.params
  if (req.body) {
    try {
      const restaurantUpdated = await Restaurant.findOneAndUpdate({ uid: id }, { $set: req.body }, { new: true })
      if (restaurantUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'restaurant',
          event_type: 'updated',
          reference_id: restaurantUpdated.uid,
        }
        addLog(log)

        res.status(200).send(restaurantUpdated)
      } else {
        res.status(401).send({ error: 'Update not completed or Access Denied' })
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

  export const updateRestaurantRating: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const newRating = Number(req.body.rating);
    if (req.body) {
      try {
        const restaurant = await Restaurant.findOne({ uid: id });
        if (!restaurant) {
          return res.status(404).send({ error: 'Restaurant not found' });
        }
                restaurant.rating.push(newRating);
        const total = restaurant.rating.reduce((sum, rating) => sum + Number(rating), 0)
        console.log(total)
        console.log(restaurant.rating)
        const averageRating =  total/ restaurant.rating.length;

        restaurant.average_rating = averageRating;
  
        const ratingUpdated = await restaurant.save();
  
        const log = {
          user_id: req.body.user_id,
          model: 'restaurant',
          event_type: 'updated',
          reference_id: ratingUpdated.uid,
          average_rating: averageRating,
        };
        addLog(log);
  
        res.status(200).send({ average_rating: averageRating });
      } catch (err) {
        res.status(500).send({ error: err });
      }
    } else {
      res.status(401).send({ error: 'Update not completed or Access Denied' });
    }
  };
  
  


export const getRestaurants: RequestHandler = async (req, res) => {
  try {
    const allRestaurants = await Restaurant.find()
    res.send(allRestaurants)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all restaurants' })
  }
}

export const getRestaurant: RequestHandler = async (req, res) => {
  if (req.params) {
    const { id } = req.params
    try {
      const restaurantFound = await Restaurant.findOne({ uid: id })
      res.status(200).send(restaurantFound)
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const disableRestaurant: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const restaurantUpdated = await Restaurant.findOneAndUpdate({ uid: id }, { $set: { enabled: false } })

    if (restaurantUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'restaurant',
        event_type: 'disabled',
        reference_id: restaurantUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Restaurant id ${id} has been disabled ` })
    } else {
      res.status(404).send({ success: `Restaurant with ${id} not found ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}




