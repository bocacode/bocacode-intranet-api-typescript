import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { mongooseConnect } from './utils/mongoUtility'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 4040, () => console.log(`port running on ${process.env.PORT}`))

import restaurantRoutes from './routes/restaurantsRoutes'
app.use('/api/restaurants', restaurantRoutes)

import homeworkRoutes from './routes/homeworkRoutes'
app.use('/api/homework', homeworkRoutes)

mongooseConnect()
