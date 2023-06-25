import { RequestHandler } from "express";
import { createRandomId } from "../../utils/utils";
import Coffees from '../../models/practiceAPIs/coffeeModel'
import { addLog } from "../logController";

export const addCoffee: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateCoffee = req.body.uid ? await Coffees.findOne({uid: req.body.uid}) : null
      if (duplicateCoffee) {
        return res.status(401).json({ error: 'Coffee already in system'})
      }
      const newCoffee = { ...req.body, uid: createRandomId(), created_by: req.body.user_id }

      const coffeeCreated = await Coffees.create(newCoffee)

      if (coffeeCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'coffee',
          event_type: 'new',
          reference_id: newCoffee.uid,
        }
        addLog(log)

        res.send(coffeeCreated)
      } else {
        res.status(401).json({ error: 'Coffee was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method'})
    }
  }
}

export const updateCoffee: RequestHandler = async (req, res) => {
  if(req.body) {
    try{
      const coffeeUpdated = await Coffees.findOneAndUpdate({ uid: req.params.id }, { $set: req.body }, { new: true })

      if (coffeeUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'coffee',
          event_type: 'updated',
          reference_id: coffeeUpdated.uid,
        }
        addLog(log)

        res.send(coffeeUpdated)
      }
    } catch(err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied'})
  }
}

export const getCoffees: RequestHandler = async (req, res) => {
  try{
    const allCoffees = await Coffees.find()
    res.send(allCoffees)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Coffees' })
  }
}

export const getCoffee: RequestHandler = async (req, res) => {
  if(!req.params) return res.status(401).send({ error: 'ID missing or Access Denied'})
  try {
    const { id } = req.params
    const itemFound = await Coffees.findOne({ uid: id })
    res.status(200).send(itemFound)
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

export const disableCoffee: RequestHandler = async (req, res) => {
  if(!req.params) return res.status(401).send({ error: 'Coffee not disabled or Access Denied'})

  try {
    const { coffeeId } = req.params
    const coffeeUpdated = await Coffees.findOneAndUpdate({ uid: coffeeId }, { $set: { enabled: false} })

    if(coffeeUpdated) {
      const log = {
        user_id: req.body.user_id,
          model: 'coffee',
          event_type: 'disabled',
          reference_id: coffeeUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Coffee id ${coffeeId} has been disabled` })
    }
  } catch(err) {
    res.status(500).send({ error: err})
  }
}