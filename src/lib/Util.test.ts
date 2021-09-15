import util from './Util'

describe('Util', () => {
  describe('createBeatRange', () => {
    const assertBeatCount = (width: number, beatCount: number, density = 2) => {
      const expected = new Array(beatCount).fill(0)
      const result = util.createBeatRange(width, density)

      expect(result.length).toEqual(expected.length)
    }

    it('creates at least 100 beats', () => {
      assertBeatCount(10, 100)
      assertBeatCount(200, 100, 4)
    })

    it('creates {density} times less beats than the provided width', () => {
      assertBeatCount(200, 100, 2)
      assertBeatCount(800, 200, 4)
    })
  })

  describe('getBeatValue', () => {
    it('generates a random value deviating from offset at most by the factor value', () => {
      const values = [
        [0.1, 0.1],
        [0.2, -0.1],
        [0.3, 0.5],
        [0.25, 0.8],
        [0.7, -0.3],
        [0.5, -0]
      ]

      values.forEach(([factor, offset]) => {
        const value = util.getBeatValue(factor, offset)

        expect(value).toBeLessThanOrEqual(offset + factor)
      })
    })
  })

  describe('getNextBeatIndex', () => {
    it.each<number[]>([
      [0, 1, 0],
      [1, 1, 0],
      [1, 3, 2],
      [1, 4, 2]
    ])(
      'produces correct index for currentIndex %i and beatCount %i',
      (currentIndex, beatCount, nextIndex) => {
        expect(util.getNextBeatIndex(currentIndex, beatCount)).toEqual(
          nextIndex
        )
      }
    )
  })

  describe('constraintWithinRange', () => {
    it.each<number[]>([
      [8, 10, 100, 10],
      [11, 10, 100, 11],
      [101, 10, 100, 100]
    ])(
      'constraints value %i within range of min %i and max %i',
      (value, min, max, result) => {
        expect(util.constraintWithinRange(value, min, max)).toEqual(result)
      }
    )
  })
})
