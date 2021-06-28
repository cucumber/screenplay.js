import {Actor} from "../src";
import {Condition} from "../src/Actor";
import assert = require("assert");

describe('Actor', () => {
  let actor: Actor<World>
  beforeEach(() => actor = new Actor(new World(), 'kilroy'))

  describe('#expect', () => {
    it('resolves immediately when condition does not throw', async () => {
      const condition: Condition<number> = () => Promise.resolve(42)
      const result = await actor.expect(condition)
      assert.strictEqual(result, 42)
    })

    it('resolves eventually after rejecting first', async () => {
      let n = 40
      const condition: Condition<string> = async () => {
        assert.strictEqual(n++, 42)
        return 'ok'
      }
      const result = await actor.expect(condition)
      assert.strictEqual(result, 'ok')
    })

    it('rejects with the last error when the timeout has elapsed', async () => {
      const condition: Condition<string> = async () => {
        assert.strictEqual(10, 42)
        return 'ok'
      }
      await assert.rejects(actor.expect(condition, {timeout: 150}), {message: 'Expected values to be strictly equal:\n\n10 !== 42\n'})
    })

    it('rejects with a timeout error when the condition never settles', async () => {
      const condition: Condition = () => new Promise((resolve) => setTimeout(resolve, 200))
      await assert.rejects(actor.expect(condition, {timeout: 150}), {message: 'Timeout after 150ms'})
    })
  })
})

class World {

}
