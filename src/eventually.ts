export type Condition<Result = void> = () => Result | Promise<Result>

export type EventuallyOptions = {
  timeout?: number
  interval?: number
}

const defaultExpectOptions: EventuallyOptions = { interval: 50, timeout: 1000 }

/**
 * Waits for a condition to eventually pass. The condition may run several times depending on the timeout
 * and interval values of options.
 *
 * @param condition
 * @param options
 */
export default function eventually<Result>(condition: Condition<Result>, options?: EventuallyOptions): Promise<Result> {
  const { interval, timeout } = { ...defaultExpectOptions, ...options }

  let lastError: Error | undefined = undefined
  let iv: NodeJS.Timeout
  const conditionPromise = new Promise<Result>((resolve) => {
    iv = setIntervalImmediately(() => {
      try {
        Promise.resolve(condition())
          .then((answer) => resolve(answer))
          .catch((err) => (lastError = err))
      } catch (err) {
        lastError = err
      }
    }, interval)
  })
  let to: NodeJS.Timeout
  const timeoutPromise = new Promise<Result>(
    (resolve, reject) =>
      (to = setTimeout(() => {
        reject(lastError || new Error(`Timeout after ${timeout}ms`))
      }, timeout))
  )

  return new Promise<Result>((resolve, reject) => {
    Promise.race([conditionPromise, timeoutPromise])
      .then((result) => {
        clearInterval(iv)
        clearTimeout(to)
        resolve(result)
      })
      .catch((err) => {
        clearInterval(iv)
        clearTimeout(to)
        reject(err)
      })
  })
}

// setInterval does not invoke the function immediately, but waits for the first interval.
function setIntervalImmediately(fn, interval) {
  const iv = setInterval(fn, interval)
  fn()
  return iv
}
