import Cardiogram from './Cardiogram'

describe('Cardiogram', () => {
  let cardiogram: Cardiogram

  beforeEach(() => {
    cardiogram = new Cardiogram({
      width: 500,
      density: 2
    })
  })

  describe('createBeatRange', () => {
    const assertBeatCount = (width: number, beatCount: number, density = 2) => {
      const expected = new Array(beatCount).fill(0)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = cardiogram.createBeatRange(width, density)

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = Cardiogram.getBeatValue(factor, offset)

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(Cardiogram.getNextBeatIndex(currentIndex, beatCount)).toEqual(
          nextIndex
        )
      }
    )
  })
})
