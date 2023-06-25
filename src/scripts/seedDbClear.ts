import mongoose, { ConnectOptions } from 'mongoose'
import 'dotenv/config'

import { addLog } from '../controllers/logController'

import RestaurantModel from '../models/restaurantModel'

import TutorialModal from '../models/tutorialModel'

import HomeworkModal from '../models/homeworkModel'

import JobsModal from '../models/jobModel'

import LabsModal from '../models/labModel'

import LectureModel from '../models/lectureModel'

import NewsModel from '../models/newsModel'

import EventModel from '../models/eventModel'

import ChallengeModel from '../models/codeChallengeModel'

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
    const mongoString = process.env.MONGO_URI as string;
    if (!!mongoString && !mongoString.toLowerCase().includes('localhost')) return;
    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') return;

    const dummyDataDeleted = await type.deleteMany({})
    if (dummyDataDeleted) {
      console.log(`${name} => where deleted in local Mongo DB`)
    }
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
