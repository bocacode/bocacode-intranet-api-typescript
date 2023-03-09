import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { createRandomId } from '../utils/utils'
import User from '../models/usersModel'
import { addLog } from './logController'

interface TUser {
  uid: string
  email: string
  access_level: number
  first_name: string
  last_name: string
  password: string
}

export const addUser: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    const { email, password, first_name, last_name, access_level } = req.body
    try {
      const duplicateEmail = await User.findOne({ email: email })

      if (!duplicateEmail) {
        const newUser: TUser = {
          uid: 'u' + createRandomId(),
          email: email,
          access_level: access_level,
          first_name: first_name,
          last_name: last_name,
          password: password,
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userCreated = await User.create({
          ...newUser,
          password: hashedPassword,
        })

        if (userCreated) {
          const accessToken = jwt.sign(userCreated.toJSON(), process.env.PRIVATE_KEY as string)

          jwt.verify(accessToken, process.env.PRIVATE_KEY as string, async (err, decoded) => {
            res.send({ ...(decoded as any), accessToken: accessToken })
          })
        } else {
          res.status(401).json({ error: 'Use was not created' })
        }
      } else {
        res.status(401).json({ error: 'Email already in use' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const login: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const accessToken = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY as string)

      jwt.verify(accessToken, process.env.PRIVATE_KEY as string, async (err, decoded) => {
        if (decoded) {
          const { email }: any = decoded
          const log = {
            user_id: email,
            model: 'user',
            event_type: 'login',
            reference_id: email,
          }

          addLog(log)
          res.send({ ...(decoded as any), accessToken: accessToken })
        }
      })
    } else {
      res.send('No user found or invalid password')
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateUser: RequestHandler = async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (req.body) {
    const userDetails = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
    }

    try {
      const userFound = await User.findOneAndUpdate({ realtorId: req.body.realtorId }, { $set: userDetails })

      if (userFound) {
        const log = {
          user_id: userDetails.email,
          model: 'user',
          event_type: 'update',
          reference_id: userDetails.email,
        }

        addLog(log)
        res.send({ ...userFound, accessToken: token })
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const allUsers = await User.find()
    res.send(allUsers)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Users' })
  }
}

export const disableUser: RequestHandler = async (req, res) => {
  if (req.params) {
    const { email } = req.params
    try {
      const userUpdated = await User.findOneAndUpdate({ email: email }, { $set: { enabled: false } })

      if (userUpdated) {
        if (userUpdated) {
          const log = {
            user_id: userUpdated.email,
            model: 'user',
            event_type: 'disabled',
            reference_id: userUpdated.email,
          }

          addLog(log)

          res.status(200).send({ success: `User id ${email} has been disabled ` })
        }
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}
