import mongoose from 'mongoose'
import 'dotenv/config'

import { mongooseConnect } from '../utils/mongoUtility'

import RestaurantModel from '../models/restaurantModel'
import TutorialModal from '../models/tutorialModel'
import HomeworkModal from '../models/homeworkModel'
import JobsModal from '../models/jobModel'
import LabsModal from '../models/labModel'
import LectureModel from '../models/lectureModel'
import NewsModel from '../models/newsModel'
import EventModel from '../models/eventModel'
import ChallengeModel from '../models/codeChallengeModel'
import studentModel from '../models/studentModel'
import usersModel from '../models/usersModel'
import logsModel from '../models/logsModel'
import wellnessModel from '../models/wellnessModel'
import cohortModel from '../models/cohortModel'

mongooseConnect()

const clearSeedData = async (type: any, name: string) => {
  try {
    const mongoString = process.env.MONGO_URI as string
    if (!!mongoString && !mongoString.toLowerCase().includes('localhost')) return
    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') return

    const dummyDataDeleted = await type.deleteMany({})
    if (dummyDataDeleted) {
      console.log(`${name} => where deleted in LOCAL Mongo DB`)
    }
  } catch (error) {
    console.log('error -> ', error)
  }
}

Promise.all([
  clearSeedData(RestaurantModel, 'Restaurants'),
  clearSeedData(TutorialModal, 'Tutorials'),
  clearSeedData(HomeworkModal, 'Homeworks'),
  clearSeedData(JobsModal, 'Jobs'),
  clearSeedData(LabsModal, 'Labs'),
  clearSeedData(LectureModel, 'Lectures'),
  clearSeedData(NewsModel, 'News'),
  clearSeedData(EventModel, 'Events'),
  clearSeedData(ChallengeModel, 'Challenges'),
  clearSeedData(studentModel, 'Students'),
  clearSeedData(usersModel, 'Users'),
  clearSeedData(logsModel, 'Logs'),
  clearSeedData(wellnessModel, 'Wellness'),
  clearSeedData(cohortModel, 'Cohorts'),
])
  .then(() => mongoose.connection.close())
  .catch((err) => console.error(err))
