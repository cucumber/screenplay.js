import assert = require('assert')
import eventually, { Condition } from '../src/eventually'

describe('#expect', () => {
  describe('without Promise', () => {
    it('resolves immediately when condition does not throw', async () => {
      const condition: Condition<number> = () => 42
      const result = await eventually(condition)
      assert.strictEqual(result, 42)
    })

    it('resolves eventually after rejecting first', async () => {
      let n = 40
      const condition: Condition<string> = () => {
        assert.strictEqual(n++, 42)
        return 'ok'
      }
      const result = await eventually(condition)
      assert.strictEqual(result, 'ok')
    })

    it('rejects with the last error when the timeout has elapsed', async () => {
      const condition: Condition<string> = () => {
        assert.strictEqual(10, 42)
        return 'ok'
      }
      await assert.rejects(eventually(condition, { timeout: 150 }), {
        message: 'Expected values to be strictly equal:\n\n10 !== 42\n',
      })
    })

    it('rejects with a timeout error when the condition never settles', async () => {
      const condition: Condition = () => new Promise((resolve) => setTimeout(resolve, 200))
      await assert.rejects(eventually(condition, { timeout: 150 }), { message: 'Timeout after 150ms' })
    })
  })

  describe('with Promise', () => {
    it('resolves immediately when condition does not throw', async () => {
      const condition: Condition<number> = () => Promise.resolve(42)
      const result = await eventually(condition)
      assert.strictEqual(result, 42)
    })

    it('resolves eventually after rejecting first', async () => {
      let n = 40
      const condition: Condition<string> = async () => {
        assert.strictEqual(n++, 42)
        return 'ok'
      }
      const result = await eventually(condition)
      assert.strictEqual(result, 'ok')
    })

    it('rejects with the last error when the timeout has elapsed', async () => {
      const condition: Condition<string> = async () => {
        assert.strictEqual(10, 42)
        return 'ok'
      }
      await assert.rejects(eventually(condition, { timeout: 150 }), {
        message: 'Expected values to be strictly equal:\n\n10 !== 42\n',
      })
    })

    it('rejects with a timeout error when the condition never settles', async () => {
      const condition: Condition = () => new Promise((resolve) => setTimeout(resolve, 200))
      await assert.rejects(eventually(condition, { timeout: 150 }), { message: 'Timeout after 150ms' })
    })
  })
})
