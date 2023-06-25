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

const seedDB = async (data: any, type: any, name: string) => {
  try {
    // await Restaurant.deleteMany({})  // enable only to delete all items in collection
    const dummyDataCreated = await type.insertMany(data)
    if (dummyDataCreated) {
      // const log = {
      //   user_id: 'admin',
      //   model: 'deal',
      //   event_type: 'Dummy type Created',
      //   reference_id: 'dummy-data',
      console.log(`${name} => where created in local Mongo DB`)
    }
    // addLog(log)
    // console.log(`'All ${type} -> `, allData) // to get all the data back
    // }
  } catch (error) {
    console.log('error -> ', error)
  }
}

Promise.all([
  // seedDB(restaurantData, RestaurantModel, 'Restaurants'),
  // seedDB(tutorialsData, TutorialModal, 'Tutorials'),
  // seedDB(homeworkData, HomeworkModal, 'Homeworks'),
  // seedDB(jobsData, JobsModal, 'Jobs'),
  // seedDB(labsData, LabsModal, 'Labs'),
  // seedDB(lecturesData, LectureModel, 'Lectures'),
  // seedDB(newsData, NewsModel, 'News'),
  // seedDB(eventsData, EventModel, 'Events'),
  // seedDB(challengesData, ChallengeModel, 'Events'),
]).then(() => mongoose.connection.close())
