import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript gym',
        description: 'Some description',
        phone: '119999999',
        latitude: -23.5080748,
        longitude: -46.3227799,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript gym',
        description: 'Some description',
        phone: '119999999',
        latitude: -23.5080748,
        longitude: -46.4337799,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.5080748,
        longitude: -46.3227799,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript gym' }),
    ])
  })
})
