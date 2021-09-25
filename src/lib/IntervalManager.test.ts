import IntervalManager from './IntervalManager'

describe('IntervalManager', () => {
  let intervalManager: IntervalManager

  beforeEach(() => {
    intervalManager = new IntervalManager()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('setInterval', () => {
    it('returns intervalId', () => {
      const intervalId = intervalManager.setInterval(jest.fn(), 100)

      expect(typeof intervalId).toBe('number')
    })

    it('calls handler after a specified timeout', () => {
      const handler = jest.fn()
      intervalManager.setInterval(handler, 100)

      jest.advanceTimersByTime(300)
      expect(handler).toHaveBeenCalledTimes(3)
    })
  })

  describe('clearAll', () => {
    it('clears all intervals', () => {
      const [firstHandler, secondHandler] = [jest.fn(), jest.fn()]

      intervalManager.setInterval(firstHandler, 200)
      intervalManager.setInterval(secondHandler, 300)

      jest.advanceTimersByTime(500)
      expect(firstHandler).toHaveBeenCalledTimes(2)
      expect(secondHandler).toHaveBeenCalledTimes(1)

      intervalManager.clearAll()

      jest.advanceTimersByTime(500)
      expect(firstHandler).not.toHaveBeenCalledTimes(3)
      expect(secondHandler).not.toHaveBeenCalledTimes(2)
    })
  })
})
