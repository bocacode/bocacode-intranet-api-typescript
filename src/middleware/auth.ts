import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/usersModel'

export const auth: RequestHandler = (req, res, next) => {
  const token: string | undefined = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).send({ error: 'you must be logged in' })
  }

  jwt.verify(token, process.env.PRIVATE_KEY as string, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'you must be logged in' })
    }

    if (decoded) {
      const { email }: any = decoded
      const userFound = await User.findOne({ email: email })
      if (userFound) next()
    }
  })
}
