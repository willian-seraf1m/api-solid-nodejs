import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from '../create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Java Gym',
      description: null,
      phone: null,
      latitude: -23.5080748,
      longitude: -46.3227799,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
