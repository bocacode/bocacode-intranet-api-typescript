import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { mongooseConnect } from './utils/mongoUtility'

export const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 4040, () => console.log(`port running on ${process.env.PORT}`))

import userRoutes from './routes/userRoutes'
app.use('/api/users/', userRoutes)

import logRoutes from './routes/logRoutes'
app.use('/api/logs/', logRoutes)

import restaurantRoutes from './routes/restaurantRoutes'
app.use('/api/restaurants', restaurantRoutes)

import homeworkRoutes from './routes/homeworkRoutes'
app.use('/api/homeworks', homeworkRoutes)

import studentsRoutes from './routes/studentRoutes'
app.use('/api/students/', studentsRoutes)

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

import labRoutes from './routes/labRoutes'
app.use('/api/labs', labRoutes)

import lectureRoutes from './routes/lectureRoutes'
app.use('/api/lectures', lectureRoutes)

import wellnessRoutes from './routes/wellnessRoutes'
app.use('/api/wellness', wellnessRoutes)

import beerRoutes from './routes/practiceAPIs/beerRoutes'
app.use('/api/beers', beerRoutes)

import cohortRoutes from './routes/cohortRoutes'
app.use('/api/cohorts', cohortRoutes)

mongooseConnect()
