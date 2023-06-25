import mongoose, { ConnectOptions } from 'mongoose'
import 'dotenv/config'

import { addLog } from '../controllers/logController'

import RestaurantModel from '../models/restaurantModel'
const restaurantData = require('../../old_data/restaurants.json')

import TutorialModal from '../models/tutorialModel'
const tutorialsData = require('../../old_data/tutorials.json')

import HomeworkModal from '../models/homeworkModel'
const homeworkData = require('../../old_data/homeworks.json')

import JobsModal from '../models/jobModel'
const jobsData = require('../../old_data/jobs.json')

import LabsModal from '../models/labModel'
const labsData = require('../../old_data/labs.json')

import LectureModel from '../models/lectureModel'
const lecturesData = require('../../old_data/lectures.json')

import NewsModel from '../models/newsModel'
const newsData = require('../../old_data/news.json')

import EventModel from '../models/eventModel'
const eventsData = require('../../old_data/events.json')

import ChallengeModel from '../models/codeChallengeModel'
const challengesData = require('../../old_data/challenges.json')

mongoose.set('strictQuery', false)
mongoose
  .connect(
    process.env.MONGO_URI as string,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions
  )
  .then((result: any) => {
    if (result.STATES['1']) {
      console.log(`Connected to Mongo -  ${process.env.PORT}`)
    } else {
      console.error
    }
  })
  .catch((err) => console.error(err))

const seedDB = async (type: any, name: string) => {
  try {
    // await Restaurant.deleteMany({})  // enable only to delete all items in collection
    const dummyDataDeleted = await type.deleteMany({})
    if (dummyDataDeleted) {
      // const log = {
      //   user_id: 'admin',
      //   model: 'deal',
      //   event_type: 'Dummy type Created',
      //   reference_id: 'dummy-data',
      console.log(`${name} => where deleted in local Mongo DB`)
    }
    // addLog(log)
    // console.log(`'All ${type} -> `, allData) // to get all the data back
    // }
  } catch (error) {
    console.log('error -> ', error)
  }
}

Promise.all([
  seedDB(RestaurantModel, 'Restaurants'),
  seedDB(TutorialModal, 'Tutorials'),
  seedDB(HomeworkModal, 'Homeworks'),
  seedDB(JobsModal, 'Jobs'),
  seedDB(LabsModal, 'Labs'),
  seedDB(LectureModel, 'Lectures'),
  seedDB(NewsModel, 'News'),
  seedDB(EventModel, 'Events'),
  seedDB(ChallengeModel, 'Events'),
]).then(() => mongoose.connection.close())
