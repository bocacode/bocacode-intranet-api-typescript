import mongoose, { ConnectOptions } from 'mongoose'
import 'dotenv/config'

import Restaurant from '../models/restaurantModel'
import Homework from '../models/homeworkModel'
import Tutorial from '../models/tutorialModel'

import { dummyRestaurants, dummyHomework, dummyTutorials } from './seedData'
import { addLog } from '../controllers/logController'

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

const seedDB = async (data: any, type: string) => {
  try {
    // await Restaurant.deleteMany({})  // enable only to delete all items in collection

    // const dummyDataCreated = await Homework.insertMany(data)
    // const dummyDataCreated = await Restaurant.insertMany(data)
    const dummyDataCreated = await Tutorial.insertMany(data)
    if (dummyDataCreated) {
      const log = {
        user_id: 'admin',
        model: 'deal',
        event_type: 'Dummy type Created',
        reference_id: 'dummy-data',
      }
      // addLog(log)
      console.log(process.env.MONGO_URI)
      console.log(`${type}s created in local Mongo DB`)
      // const allData = await type.find() // to get all the data back
      // console.log(`'All ${type} -> `, allData) // to get all the data back
    }
  } catch (error) {
    console.log('error -> ', error)
  }
}

// Promise.all([seedDB(dummyRestaurants, Restaurant), seedDB(dummyHomework, Homework)]).then(() =>
//   mongoose.connection.close()
// )

// seedDB(dummyRestaurants, 'Restaurant').then(() => mongoose.connection.close())
// seedDB(dummyHomework, 'Homework').then(() => mongoose.connection.close())
seedDB(dummyTutorials, 'Tutotials').then(() => mongoose.connection.close())
