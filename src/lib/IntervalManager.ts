export default class IntervalManager {
  private intervalIds: number[] = []

  public setInterval(handler: TimerHandler, timeout?: number): number {
    const intervalId = window.setInterval(handler, timeout)
    this.intervalIds.push(intervalId)

    return intervalId
  }

  public clearAll(): void {
    this.intervalIds.forEach((intervalId) => {
      window.clearInterval(intervalId)
    })
  }
}
