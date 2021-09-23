import { constraintWithinRange } from './util'

describe('constraintWithinRange', () => {
  it.each<number[]>([
    [8, 10, 100, 10],
    [11, 10, 100, 11],
    [101, 10, 100, 100]
  ])(
    'constraints value %i within range of min %i and max %i',
    (value, min, max, result) => {
      expect(constraintWithinRange(value, min, max)).toEqual(result)
    }
  )
})
