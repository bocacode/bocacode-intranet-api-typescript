import request from 'supertest'

import { app } from '../../src/index'

describe('User routes', () => {
  test('should mock process.env', () => {
    process.env.NODE_ENV = 'development'
  })

  test('Get all restaurants', async () => {
    const res = await request(app).get('/api/restaurants').expect('Content-Type', /json/).expect(200)
    // console.log(res)
    // expect(res).toEqual(['Goon', 'Tsuki', 'Joe'])
  })
})
