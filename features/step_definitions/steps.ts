import { Given, When, Then } from '@cucumber/cucumber'
import { Actor } from '../../src'

import World from '../support/World'
import { Message } from '../src/types'
import assert from 'assert'
import eventually from '../../src/eventually'
import getSession from '../support/helpers/getSession'

Given('{actor} is online', async function (this: World, actor: Actor<World>) {
  await actor.attemptsTo(this.startSession())
})

Given(
  '{actor} is located {int}m from {actor}',
  function (this: World, actor1: Actor<World>, distance: number, actor2: Actor<World>) {
    // We don't use an interaction (actor.attemptsTo) here.

    const actor1Session = this.shouty.getSession(getSession(actor1).userId)
    const actor2Session = this.shouty.getSession(getSession(actor2).userId)
    actor1Session.coordinate = { x: actor2Session.coordinate.x, y: actor2Session.coordinate.y + distance }
  }
)

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
