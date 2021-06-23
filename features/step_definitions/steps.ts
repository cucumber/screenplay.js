import { Given, When, Then } from '@cucumber/cucumber'
import { Actor } from '../../src'

import assert from 'assert'
import World from '../support/World'

import moveTo from '../support/interactions/moveTo/moveTo'
import shout from '../support/interactions/shout/shout'
import messagesHeard from '../support/questions/messagesHeard/messagesHeard'

Given('{actor} is located {int}m from {actor}', async function (mainActor: Actor<World>, distance: number, secondaryActor: Actor<World>) {
  await mainActor.attemptsTo(moveTo(distance))
})

When('{actor} shouts {string}', async function (actor: Actor<World>, message: string) {
  await actor.attemptsTo(shout(message))
  actor.remember('lastMessage', message)
})

Then('{actor} hears {actor}’s message', async function (mainActor: Actor<World>, secondaryActor: Actor<World>) {
  const mainActorHeardMessages = await mainActor.ask(messagesHeard())
  const secondaryActorLatestMessage = secondaryActor.recall('lastMessage')

  assert.deepStrictEqual(mainActorHeardMessages, [secondaryActorLatestMessage])
})

Then('{actor} hears nothing', async function (actor: Actor<World>) {
  const heardMessages = await actor.ask(messagesHeard())

  assert.deepStrictEqual(heardMessages, [])
});
