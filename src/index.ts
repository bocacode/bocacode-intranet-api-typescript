import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { mongooseConnect } from './utils/mongoUtility'

const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 4040, () => console.log(`port running on ${process.env.PORT}`))

import userRoutes from './routes/userRoutes'
app.use('/api/users/', userRoutes)

import restaurantRoutes from './routes/restaurantRoutes'
app.use('/api/restaurants', restaurantRoutes)

import homeworkRoutes from './routes/homeworkRoutes'
app.use('/api/homeworks', homeworkRoutes)

import tutorialRoutes from './routes/tutorialRoutes'
app.use('/api/tutorials', tutorialRoutes)

import newsRoutes from './routes/newsRoutes'
app.use('/api/news', newsRoutes)

import jobRoutes from './routes/jobRoutes'
app.use('/api/jobs', jobRoutes)

import eventRoutes from './routes/eventRoutes'
app.use('/api/events', eventRoutes)

import codeChallengeRoutes from './routes/codeChallengeRoutes'
app.use('/api/codeChallenges', codeChallengeRoutes)

mongooseConnect()
