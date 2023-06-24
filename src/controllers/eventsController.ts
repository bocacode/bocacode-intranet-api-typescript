import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Events from '../models/eventModel'
import { addLog } from './logController'

export const addEvent: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateEvent = req.body.uid ? await Events.findOne({ uid: req.body.uid }) : null
      if (duplicateEvent) {
        return res.status(401).json({ error: 'Event already in system' })
      }

      const newEvent = { ...req.body, uid: createRandomId() }

      const eventCreated = await Events.create(newEvent)

      if (eventCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'event',
          event_type: 'new',
          reference_id: newEvent.uid,
        }
        addLog(log)

        res.send('Event created')
      } else {
        res.status(401).json({ error: 'Event was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateEvent: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      const eventUpdated = await Events.findOneAndUpdate({ eventId: req.body.eventId }, { $set: req.body })

      if (eventUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'event',
          event_type: 'updated',
          reference_id: eventUpdated.uid,
        }
        addLog(log)

        res.send(eventUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getEvents: RequestHandler = async (req, res) => {
  try {
    const allEvents = await Events.find()
    res.send(allEvents)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Events' })
  }
}

export const getEvent: RequestHandler = async (req, res) => {
  if(req.params) {
    const  { id } = req.params
    try {
      const userFound = await Events.findById(id)
      res.status(200).send(userFound)
    } catch (err) {
      res.status(500).send({ error: err})
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denie'})
  }
}

export const disableEvent: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { eventId } = req.params
    const eventUpdated = await Events.findOneAndUpdate({ uid: eventId }, { $set: { enabled: false } })

    if (eventUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'event',
        event_type: 'disabled',
        reference_id: eventUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Event id ${eventId} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
