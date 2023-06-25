import request from 'supertest'

import { app } from '../../src/index'

describe('User routes', () => {
  test('should mock process.env', () => {
    process.env.NODE_ENV = 'development'
  })

  test('Get all logs', async () => {
    const res = await request(app).get('/api/logs').expect('Content-Type', /json/).expect(200)
  })
})
