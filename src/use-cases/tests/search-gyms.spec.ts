import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from '../search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.5080748,
      longitude: -46.3227799,
    })

    await gymsRepository.create({
      title: 'typescript gym',
      description: null,
      phone: null,
      latitude: -23.5080748,
      longitude: -46.3227799,
    })

    const { gyms } = await sut.execute({ query: 'javascript', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Java Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5080748,
        longitude: -46.3227799,
      })
    }

    const { gyms } = await sut.execute({ query: 'Java', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Java Gym 21' }),
      expect.objectContaining({ title: 'Java Gym 22' }),
    ])
  })
})
