export type Condition<Result = void> = () => Result | Promise<Result>

export type EventuallyOptions = {
  timeout?: number
  interval?: number
}

/**
 * Waits for a condition to eventually pass. The condition may run several times depending on the timeout
 * and interval values of options.
 *
 * @param condition
 * @param options
 */
export default function eventually<Result>(condition: Condition<Result>, options?: EventuallyOptions): Promise<Result> {
  const { interval, timeout } = { interval: 50, timeout: 1000, ...options }

  let lastError: Error | undefined = undefined
  let intervalId: NodeJS.Timeout
  let timeoutId: NodeJS.Timeout

  const conditionPromise = new Promise<Result>((resolve) => {
    intervalId = setIntervalImmediately(() => {
      try {
        // If condition() does not return a Promise, this will convert it into one
        // If condition() returns a Promise, this will just return the same promise
        Promise.resolve(condition())
          .then((result) => resolve(result))
          .catch((err) => (lastError = err))
      } catch (err) {
        // condition() threw an error (it was synchronous, not returning a Promise)
        lastError = err
      }
    }, interval)
  })

  const timeoutPromise = new Promise<Result>(
    (resolve, reject) =>
      (timeoutId = setTimeout(() => {
        reject(lastError || new Error(`Timeout after ${timeout}ms`))
      }, timeout))
  )

  return new Promise<Result>((resolve, reject) => {
    Promise.race([conditionPromise, timeoutPromise])
      .then((result) => {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        resolve(result)
      })
      .catch((err) => {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        reject(err)
      })
  })
}

// setInterval does not invoke the function immediately, but waits for the first interval.
// This function makes sure it is called immediately.
function setIntervalImmediately(callback: (...args: unknown[]) => void, ms: number) {
  const iv = setInterval(callback, ms)
  callback()
  return iv
}
