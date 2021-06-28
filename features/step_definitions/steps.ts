import { Given, When, Then, defineParameterType } from '@cucumber/cucumber'
import { Actor } from '../../src'

import World from '../support/World'
import { Coordinate, Message } from '../src/types'
import assert from 'assert'
import eventually from '../../src/eventually'

defineParameterType({
  name: 'coordinate',
  regexp: /\(\s*(\d+),\s*(\d+)\s*\)/,
  transformer(x, y) {
    return { x: +x, y: +y }
  },
})

Given('{actor} is located at {coordinate}', async function (this: World, actor: Actor<World>, coordinate: Coordinate) {
  await actor.attemptsTo(this.startSession(coordinate))
})

When('{actor} shouts {string}', async function (this: World, shouter: Actor, message: Message) {
  await shouter.attemptsTo(this.shout(message))
  shouter.remember('lastMessage', message)
})

Then('{actor} hears {actor}’s message', async function (this: World, listener: Actor<World>, shouter: Actor) {
  const shouterLastMessage = shouter.recall('lastMessage')

  await eventually(() => {
    const listenerMessages = listener.ask(this.inboxMessages())
    assert.deepStrictEqual(listenerMessages, [shouterLastMessage])
  })
})

Then('{actor} hears nothing', async function (this: World, listener: Actor<World>) {
  await eventually(() => {
    const listenerMessages = listener.ask(this.inboxMessages())
    assert.deepStrictEqual(listenerMessages, [])
  })
})
