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
      const newCoffee = { ...req.body, uid: createRandomId() }

      const coffeeCreated = await Coffees.create(newCoffee)

      if (coffeeCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'coffee',
          event_type: 'new',
          reference_id: newCoffee.uid,
        }
        addLog(log)

        res.send('Coffee created')
      } else {
        res.status(401).json({ error: 'Beer was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method'})
    }
  }
}