import mongoose from 'mongoose'
import { mongooseConnect } from '../utils/mongoUtility'
import 'dotenv/config'

import RestaurantModel from '../models/restaurantModel'
const restaurantData = require('../../seed_data/restaurants.json')

import TutorialModal from '../models/tutorialModel'
const tutorialsData = require('../../seed_data/tutorials.json')

import HomeworkModal from '../models/homeworkModel'
const homeworkData = require('../../seed_data/homeworks.json')

import JobsModal from '../models/jobModel'
const jobsData = require('../../seed_data/jobs.json')

import LabsModal from '../models/labModel'
const labsData = require('../../seed_data/labs.json')

import LectureModel from '../models/lectureModel'
const lecturesData = require('../../seed_data/lectures.json')

import NewsModel from '../models/newsModel'
const newsData = require('../../seed_data/news.json')

import EventModel from '../models/eventModel'
const eventsData = require('../../seed_data/events.json')

import ChallengeModel from '../models/codeChallengeModel'
const challengesData = require('../../seed_data/challenges.json')

import studentModel from '../models/studentModel'
const studentsData = require('../../seed_data/students.json')

import usersModel from '../models/usersModel'
const usersData = require('../../seed_data/users.json')

import logsModel from '../models/logsModel'
const logsData = require('../../seed_data/logs.json')

import wellnessModel from '../models/wellnessModel'
const wellnessData = require('../../seed_data/wellness.json')

import cohortModel from '../models/cohortModel'
const cohortsData = require('../../seed_data/cohort.json')

mongooseConnect()

const seedDB = async (data: any, type: any, name: string) => {
  try {
    const dummyDataCreated = await type.insertMany(data)
    if (dummyDataCreated) console.log(`${name} => where created in local Mongo DB`)
  } catch (error) {
    console.log('error -> ', error)
  }
}

Promise.all([
  seedDB(restaurantData, RestaurantModel, 'Restaurants'),
  seedDB(tutorialsData, TutorialModal, 'Tutorials'),
  seedDB(homeworkData, HomeworkModal, 'Homeworks'),
  seedDB(jobsData, JobsModal, 'Jobs'),
  seedDB(labsData, LabsModal, 'Labs'),
  seedDB(lecturesData, LectureModel, 'Lectures'),
  seedDB(newsData, NewsModel, 'News'),
  seedDB(eventsData, EventModel, 'Events'),
  seedDB(challengesData, ChallengeModel, 'Challenges'),
  seedDB(studentsData, studentModel, 'Students'),
  seedDB(usersData, usersModel, 'Users'),
  seedDB(logsData, logsModel, 'Logs'),
  seedDB(wellnessData, wellnessModel, 'Wellness'),
  seedDB(cohortsData, cohortModel, 'Cohorts'),
])
  .then(() => mongoose.connection.close())
  .catch((err) => console.error(err))
