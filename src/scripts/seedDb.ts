import mongoose, { ConnectOptions } from 'mongoose'
import 'dotenv/config'

import Restaurant from '../models/restaurantModel'
import { createRandomId } from '../utils/utils'
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

const dummyRestaurants = [
  {
    uid: createRandomId(),
    address: '7024 Beracasa Way, Boca Raton, FL 33433',
    rating: '3',
    photo_url:
      'https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fwinn.jpeg?alt=media&token=cee866b1-b3ad-4881-8779-3511772cf751',
    menu_url: 'https://www.winndixie.com/shopping/departments/deli',
    created_by: 'data seed',
    name: 'Winn-Dixie',
  },
  {
    uid: createRandomId(),
    rating: '4',
    address: '7032 W Palmetto Park Rd, Boca Raton, FL 33433',
    created_by: 'data seed',
    name: 'Starbucks ',
    menu_url: 'starbucks.com/menu',
    photo_url:
      'https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fstarbucks%20.jpeg?alt=media&token=404140bf-3139-4ad4-bd24-24de58e34ddf',
  },
  {
    uid: createRandomId(),
    rating: '3',
    menu_url: 'https://www.chipotle.com/order/#menu',
    photo_url:
      'https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fchipotle.jpeg?alt=media&token=6e0caaf6-82fd-45c4-9ea2-60441d8ff001',
    address: '7028 W Palmetto Park Rd Ste 106, Boca Raton, FL 33433',
    created_by: 'data seed',
    name: 'Chipotle ',
  },
  {
    uid: createRandomId(),
    rating: '3',
    menu_url: 'https://www.publix.com/mc/order-ahead/order-subs-and-wraps',
    address: '7060 W Palmetto Park Rd, Boca Raton, FL 33433',
    created_by: 'data seed',
    name: 'Publix ',
    photo_url:
      'https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fpublix.png?alt=media&token=930bda94-69f6-4a61-9626-9a73eda90eaf',
  },
]

const seedDB = async () => {
  try {
    // await Restaurant.deleteMany({})
    const dummyDataCreated = await Restaurant.insertMany(dummyRestaurants)
    if (dummyDataCreated) {
      const log = {
        user_id: 'admin',
        model: 'deal',
        event_type: 'Dummy Restaurants Created',
        reference_id: 'dummy-data',
      }
      addLog(log)
      console.log('Restaurants created in local Mongo DB')
    }
  } catch (error) {
    console.log(error)
  }
}

seedDB().then(() => mongoose.connection.close())
