import { createRandomId } from '../utils/utils'

export const dummyRestaurants = [
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

export const dummyHomework = [
  {
    uid: createRandomId(),
    created_by: 'data seed',
    enabled: true,
    week: 'Week 1',
    subtopic: '',
    topic: 'Objects',
    question: 'Create an object called student and add 3 properties with their values.',
  },
  {
    uid: createRandomId(),
    created_by: 'data seed',
    enabled: true,
    topic: 'Functions',
    question:
      'Write a function named assignGrade, that takes one argument, a number score. Return a grade for the score, either “A,” “B,” “C,” “D,” or “F.” Invoke that function for a few different scores and log the result to make sure it works.',
    week: 'Week 1',
    subtopic: 'Conditionals',
  },
  {
    uid: createRandomId(),
    created_by: 'data seed',
    enabled: true,
    subtopic: '',
    week: 'Week 1',
    question:
      'Create a function that takes an array of numbers and returns a new array with the square of each number.',
    topic: 'Functions',
  },
  {
    uid: createRandomId(),
    created_by: 'data seed',
    enabled: true,
    week: 'Week 1',
    question:
      'Create a function which returns the number of true values there are in an array. const testArray = [true, false, false, true, false, false, false, true, true, true, false].',
    subtopic: 'Arrays',
    topic: 'Functions',
  },
]

export const dummyTutorials = [
  {
    uid: createRandomId(),
    created_by: 'data seed',
    media_type: 'video',
    enabled: true,
    url: 'https://www.youtube.com/watch?v=UmSpfdxu3ro&ab_channel=DevDreamer',
    description: 'JavaScript data-types, explained by Dev Dreamer',
    title: 'Data-Types in JavaScript',
    topic: 'JavaScript',
  },
  {
    uid: createRandomId(),
    created_by: 'data seed',
    media_type: 'video',
    enabled: true,
    title: 'Error Handling in JavaScript',
    description: 'JavaScript error handling, explained by Bro Code',
    topic: 'JavaScript',
    url: 'https://www.youtube.com/watch?v=Z2l3cQ7bvBA&ab_channel=BroCode',
  },
  {
    uid: createRandomId(),
    created_by: 'data seed',
    media_type: 'video',
    enabled: true,
    topic: 'JavaScript',
    url: 'https://www.youtube.com/watch?v=T8tilXV03UI&ab_channel=DevDreamer',
    description: 'JavaScript function-expressions, explained by Dev Dreamer',
    title: 'Function-Expressions in JavaScript',
  },
  {
    uid: createRandomId(),
    created_by: 'data seed',
    media_type: 'video',
    enabled: true,
    url: 'https://www.youtube.com/watch?v=2-ojI5M9HME&ab_channel=BroCode',
    topic: 'JavaScript',
    title: 'Arrays in JavaScript',
    description: 'JavaScript arrays for beginners, explained by Bro Code',
  },
  {
    uid: createRandomId(),
    created_by: 'data seed',
    media_type: 'video',
    enabled: true,
    topic: 'JavaScript',
    title: 'Arrow-Functions in JavaScript',
    url: 'https://www.youtube.com/watch?v=Oy185MF8pnY&ab_channel=DevDreamer',
    description: 'JavaScript arrow functions, explained by Dev Dreamer',
  },
]
