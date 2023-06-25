import request from 'supertest'

import { app } from '../../src/index'

describe('User routes', () => {
  test('should mock process.env', () => {
    process.env.NODE_ENV = 'development'
  })

  test('Get all lectures', async () => {
    const res = await request(app).get('/api/lectures').expect('Content-Type', /json/).expect(200)
  })
})
