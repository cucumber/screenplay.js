import { Given, When, Then, defineParameterType } from '@cucumber/cucumber'
import { Actor } from '../../src'

import World from '../support/World'
import { Coordinate, Message } from '../src/types'
import getMessages from '../support/helpers/getMessages'
import assert from 'assert'
import eventually from '../../src/eventually'

defineParameterType({
  name: 'coordinate',
  regexp: /\(\s*(\d+),\s*(\d+)\s*\)/,
  transformer(x, y) {
    return { x: +x, y: +y }
  },
})

Given('{actor} is located at {coordinate}', function (this: World, actor: Actor<World>, coordinate: Coordinate) {
  // It's a good guideline to never use interations in Given steps.
  // Given steps are for setting up the "scene" of the scenario, and the preferred way
  // to do this is by doing it directly in the domain layer
  const session = this.shouty.getShoutySession(actor.name)
  const messages = getMessages(actor)
  session.inbox.on((message) => messages.push(message))
  session.coordinate = coordinate
})

When('{actor} shouts {string}', async function (this: World, shouter: Actor, message: Message) {
  await shouter.attemptsTo(this.shout(message))
  shouter.remember('lastMessage', message)
})

Then('{actor} hears {actor}’s message', async function (this: World, listener: Actor<World>, shouter: Actor) {
  const shouterLastMessage = shouter.recall('lastMessage')

  await eventually(() => {
    const listenerMessages = getMessages(listener)
    assert.deepStrictEqual(listenerMessages, [shouterLastMessage])
  })
})

Then('{actor} hears nothing', async function (this: World, listener: Actor<World>) {
  await eventually(() => {
    const listenerMessages = getMessages(listener)
    assert.deepStrictEqual(listenerMessages, [])
  })
})
