export type Condition<Result = void> = () => Result | Promise<Result>

export type ExpectOptions = {
  timeout?: number
  interval?: number
}

const defaultExpectOptions: ExpectOptions = { interval: 50, timeout: 1000 }

/**
 * Waits for a condition to eventually pass. The condition may run several times depending on the timeout
 * and interval values of options.
 *
 * @param condition
 * @param options
 */
export default async function eventually<Result>(
  condition: Condition<Result>,
  options?: ExpectOptions
): Promise<Result> {
  const { interval, timeout } = { ...defaultExpectOptions, ...options }

  let lastError: Error | undefined = undefined
  const answerPromise = new Promise<Result>((resolve) => {
    const iv = setInterval(() => {
      const result = condition()
      Promise.resolve(result)
        .then((answer) => {
          clearInterval(iv)
          resolve(answer)
        })
        .catch((err) => (lastError = err))
    }, interval)
  })
  const timeoutPromise = new Promise<Result>((resolve, reject) =>
    setTimeout(() => reject(lastError || new Error(`Timeout after ${timeout}ms`)), timeout)
  )
  return Promise.race([answerPromise, timeoutPromise])
}
